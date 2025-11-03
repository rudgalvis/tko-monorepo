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
    # Handle ALL error and redirect responses - no caching for 3xx, 4xx or 5xx
    if (beresp.status >= 300) {
        # Prevent Varnish from caching errors/redirects
        set beresp.ttl = 0s;
        set beresp.uncacheable = true;
        
        # Prevent browser from caching errors/redirects
        set beresp.http.Cache-Control = "no-cache, no-store, must-revalidate, private";
        set beresp.http.Pragma = "no-cache";
        set beresp.http.Expires = now;
        
        return (deliver);
    }

    # Force TTL for specific endpoints regardless of backend headers (only for successful responses)
    if (bereq.url ~ "currency-rates") {
        # Remove backend TTL headers
        unset beresp.http.Cache-Control;
        unset beresp.http.Expires;

        # Set browser cache headers (12 hours)
        set beresp.http.Cache-Control = "public, max-age=43200"; # 12 hours in seconds
        set beresp.http.Expires = now + 12h;

        set beresp.ttl = 12h;
        set beresp.uncacheable = false;
    } else if (bereq.url ~ "(automatic-discount|regional-variant-price)") {
        # Remove backend TTL headers
        unset beresp.http.Cache-Control;
        unset beresp.http.Expires;

        # Set browser cache headers (24 hours)
        set beresp.http.Cache-Control = "public, max-age=86400"; # 24 hours in seconds
        set beresp.http.Expires = now + 24h;

        set beresp.ttl = 24h;
        set beresp.uncacheable = false;
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