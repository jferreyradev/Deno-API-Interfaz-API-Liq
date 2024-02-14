
const MID_API = new URLPattern({ pathname: "/api/:action/:en/*?" });

const URL_API = "http://200.55.244.26:3005"

async function handler(req: Request): Promise<Response> {
  
  const match = MID_API.exec(req.url);

  if (match) {

    try {
      const URL = URL_API + match.pathname.input + (match.search.input?'?'+match.search.input:"")
      const resp = await fetch(URL,{
        headers: {
          accept: "application/json",
        },
      })     
      return new Response(resp.body, {
        status: 200 ,
        headers: {
          "Access-Control-Allow-Origin":"*",
          "content-type": "application/json",
        },
      });

    } catch (error) {
      return new Response(error, {
        status: 404,
      });
    }
  }

  console.log(URL_API)

  return new Response("Not found path", {
    status: 404,
  });

}

Deno.serve(handler);