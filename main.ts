
const MID_API = new URLPattern({ pathname: "/api/:action/:en/*?" });

//const URL_API = "http://www.serverburru2.duckdns.org:3005";

const URL_API = Deno.env.get("URL_API");

async function handler(req: Request): Promise<Response> {
  
  const match = MID_API.exec(req.url);

  if (match) {

    try {
      const URL = URL_API + match.pathname.input + (match.search.input?'?'+match.search.input:"")
      //console.log('fetch to: '+ URL)
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

  return new Response("Not found path", {
    status: 404,
  });

}

Deno.serve(handler);