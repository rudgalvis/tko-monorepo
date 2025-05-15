On server to invalidate cache

docker exec a16t-cache varnishadm "ban req.url ~ ."