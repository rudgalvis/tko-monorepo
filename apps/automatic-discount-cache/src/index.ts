import { Elysia } from "elysia";

const app = new Elysia()
  .get("/ping", () => ({
    success: true,
    message: "pong",
  }))
  .get("/ping-varnish", async ({ set }) => {
    const process = Bun.spawn(["bash", "-c", "varnishadm status"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const output = await new Response(process.stdout).text();

    if (output)
      return {
        success: true,
        message: "pong",
      };

    set.status = 400;

    return { error: "Varnish not playing", code: "PING_ERROR" };
  })
  .get("/clear", async () => {
    const process = Bun.spawn(["bash", "-c", 'varnishadm "ban req.url ~ ."'], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const output = await new Response(process.stdout).text();

    return {
      success: true,
      output: output.trim(),
      message: "All cache was cleared successfully",
    };
  })
  .get("/ban/*", async ({ params, set }) => {
    // Extract the path after /ban/
    const path = params["*"];
    
    if (!path) {
      set.status = 400;
      return { 
        error: "No path provided", 
        code: "MISSING_PATH" 
      };
    }

    // Escape special regex characters for Varnish ban command
    // The path should match the URL pattern in Varnish
    const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    const process = Bun.spawn(
      ["bash", "-c", `varnishadm "ban req.url ~ ^/${escapedPath}"`],
      {
        stdout: "pipe",
        stderr: "pipe",
      }
    );

    const output = await new Response(process.stdout).text();
    const errorOutput = await new Response(process.stderr).text();

    if (errorOutput && errorOutput.trim()) {
      set.status = 500;
      return {
        success: false,
        error: errorOutput.trim(),
        code: "BAN_ERROR",
      };
    }

    return {
      success: true,
      output: output.trim(),
      path: `/${path}`,
      message: `Cache cleared for path: /${path}`,
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
