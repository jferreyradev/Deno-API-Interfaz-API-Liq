
const MID_API = new URLPattern({ pathname: "/api/:action/:en/*?" });

//Deno.env.set("URL_API", "http://192.168.1.59:3005");

//Deno.env.set("URL_API", "http://www.serverburru2.duckdns.org:3005");

const URL_API = Deno.env.get("URL_API");

async function handler(req: Request): Promise<Response> {
  
  const match = MID_API.exec(req.url);

  if (match) {

    try {
      const URL = URL_API + match.pathname.input + (match.search.input?'?'+match.search.input:"")
      console.log('fetch to: '+ URL)
      const resp = await fetch(URL,{
        headers: {
          accept: "application/json",
        },
      })     
      return new Response(resp.body, {
        status: 200 ,
        headers: {
          "content-type": "application/json",
        },
      });

    } catch (error) {
      return new Response(error, {
        status: 404,
      });
    }
  }

  return new Response("Not found path", {
    status: 404,
  });

}

Deno.serve(handler);



/**
 * Initialize.
 */
// /* 
// const app = new Application();
// const router = new Router();

// //Deno.env.set("API_URL", "http://200.55.244.26:3005/api/");

// Deno.env.set("API_URL", "http://192.168.1.59:3005/api/")

// const API_URL = Deno.env.get("API_URL");

// /*
//   Common functions
// */

// async function getData(qstring) {
//   try {
//     const result = await fetch(qstring);
//     return result.json();
//   } catch (error) {
//     return new Response("<html> Error de petición </html>", {
//       status: 404,
//       headers: {
//         "content-type": "text/html",
//       },
//     });
//   }
// }

// /**
//  * Setup routes.
//  */

// router
//   .get("/", (context) => {
//     context.response.body = "API SUELDOS FROM DENO!";
//   })
//   .get("/list", async (context) => {
//     try {
//       console.log(context);
//       const result = await fetch(API_URL + "/view/list");
//       context.response.body = await result.json();
//     } catch (error) {
//       return new Response("<html> Error de petición </html>", {
//         status: 404,
//         headers: {
//           "content-type": "text/html",
//         },
//       });
//     }
//   })
//   .get("/data", async (context) => {

//     context.response.body = await getData(
//       API_URL + "/view/liq?" + context.request.url.searchParams.toString()
//     );
//   })
//   .get("/liqitem", async (context) => {
//     try {
//       const result = await fetch(
//         API_URL + "/view/liqItem?" + context.request.url.searchParams.toString()
//       );
//       //context.request.url.searchParams.forEach((v, k) => console.log(`${k}:${v}`));
//       //console.log(context.request.url.searchParams.toString())
//       context.response.body = await result.json();
//     } catch (error) {
//       return new Response("<html> Error de petición </html>", {
//         status: 404,
//         headers: {
//           "content-type": "text/html",
//         },
//       });
//     }
//   })
//   .get("/boletas", async (context) => {
//     try {
//       const result = await fetch(
//         API_URL + "/view/boletas?" + context.request.url.searchParams.toString()
//       );
//       //context.request.url.searchParams.forEach((v, k) => console.log(`${k}:${v}`));
//       //console.log(context.request.url.searchParams.toString())
//       context.response.body = await result.json();
//     } catch (error) {
//       return new Response("<html> Error de petición </html>", {
//         status: 404,
//         headers: {
//           "content-type": "text/html",
//         },
//       });
//     }
//   });

// /**
//  * Setup middleware.
//  */
// app.use(oakCors()); // Enable CORS for All Routes

// app.use(async (context, next) => {
//   try {
//     await next();
//   } catch (err) {
//     if (isHttpError(err)) {
//       context.response.status = err.status;
//     } else {
//       context.response.status = 500;
//     }
//     context.response.body = { error: err.message };
//     context.response.type = "json";
//   }
// });

// app.use(router.routes());
// app.use(router.allowedMethods());

// /**
//  * Start server.
//  */

// await app.listen({ port: 8080 });
 