vcl 4.1;

# Define your API backend
backend default {
    .host = "94.130.184.148";  # Replace with your API's IP address
    .port = "51000";           # Replace with your API's port
    .connect_timeout = 5s;
    .first_byte_timeout = 90s;
    .between_bytes_timeout = 2s;
}

sub vcl_recv {
    # We want to pass (not cache) if the URL does NOT contain either "automatic-discount" OR "currency-rates"
    if (req.url !~ "(automatic-discount|currency-rates|regional-variant-price)") {
        return (pass);
    }

    # Optional: Strip cookies for certain paths if they don't affect the API response
    if (req.url ~ "^/nexusApi/public/") {
        unset req.http.cookie;
    }

    # Default Varnish behavior
    return (hash);
}

sub vcl_backend_response {
    # Force TTL for specific endpoints regardless of backend headers
    if (bereq.url ~ "currency-rates") {
        # Remove backend TTL headers
        unset beresp.http.Cache-Control;
        unset beresp.http.Expires;

        set beresp.ttl = 12h;
        set beresp.uncacheable = false;
    } else if (bereq.url ~ "(automatic-discount|regional-variant-price)") {
        # Remove backend TTL headers
        unset beresp.http.Cache-Control;
        unset beresp.http.Expires;

        set beresp.ttl = 1h;
        set beresp.uncacheable = false;
    }

    # Handle 5xx errors
    if (beresp.status >= 500 && beresp.status < 600) {
        set beresp.ttl = 0s;
        set beresp.uncacheable = true;
    }

    return (deliver);
}

sub vcl_deliver {
    # Add CORS headers
    set resp.http.Access-Control-Allow-Origin = "*";
    set resp.http.Access-Control-Allow-Methods = "GET, POST, OPTIONS";
    set resp.http.Access-Control-Allow-Headers = "Origin, Content-Type, Accept, Authorization, X-Requested-With";
    set resp.http.Access-Control-Max-Age = "86400"; # 24 hours


    # Add a header to indicate cache hit or miss
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
    } else {
        set resp.http.X-Cache = "MISS";
    }

    return (deliver);
}