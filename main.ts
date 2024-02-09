import { Application, Router, isHttpError } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

/**
 * Initialize.
 */

const app = new Application();
const router = new Router();

Deno.env.set("API_URL", "http://200.55.244.26:3005/api/");

const API_URL = Deno.env.get("API_URL");


/**
 * Setup routes.
 */

router
  .get("/", (context) => {
    context.response.body = "API SUELDOS!";
  })
  .get("/vlist", async (context) => {
    try {
      const result = await fetch(API_URL + "/view/list");
      context.response.body = await result.json();
    } catch (error) {
      return new Response("<html> Error de petición </html>", {
        status: 404,
        headers: {
          "content-type": "text/html",
        },
      });
    }
  })
  .get("/liq", async (context) => {
    try {
      const result = await fetch(API_URL + "/view/liq?"+ context.request.url.searchParams.toString());
      //context.request.url.searchParams.forEach((v, k) => console.log(`${k}:${v}`));
      //console.log(context.request.url.searchParams.toString())
      context.response.body = await result.json();
    } catch (error) {
      return new Response("<html> Error de petición </html>", {
          status: 404,
          headers: {
            "content-type": "text/html",
          },
        });
    }
  })
  .get("/liqitem", async (context) => {
    try {
      const result = await fetch(API_URL + "/view/liqItem?"+ context.request.url.searchParams.toString());
      //context.request.url.searchParams.forEach((v, k) => console.log(`${k}:${v}`));
      //console.log(context.request.url.searchParams.toString())
      context.response.body = await result.json();
    } catch (error) {
      return new Response("<html> Error de petición </html>", {
          status: 404,
          headers: {
            "content-type": "text/html",
          },
        });
    }
  })
  
/**
 * Setup middleware.
 */
app.use(oakCors()); // Enable CORS for All Routes

app.use(async (context, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      context.response.status = err.status;
    } else {
      context.response.status = 500;
    }
    context.response.body = { error: err.message };
    context.response.type = "json";
  }
});

app.use(router.routes());
app.use(router.allowedMethods());


/**
 * Start server.
 */

await app.listen({ port: 80 });
