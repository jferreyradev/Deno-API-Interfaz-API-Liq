
const MID_API = new URLPattern({ pathname: "/api/:action/:en/*?" });
const MID_API_BOLETA = new URLPattern({ pathname: "/api/boleta*?" });

const URL_API = "http://www.serverburru2.duckdns.org:3005";

//const URL_API = Deno.env.get("URL_API");

async function handler(req: Request): Promise<Response> {

  const match1 = MID_API_BOLETA.exec(req.url)

  if (match1) {

    try {
      const URL = URL_API + match1.pathname.input + (match1.search.input?'?'+match1.search.input:"")
      //console.log('fetch to: '+ URL)
      const resp = await fetch(URL,{
        headers: {
          accept: "application/pdf",
        },
      })     

      const fn = resp.headers.get('content-disposition')

      //console.log(fn.split("=")[1])

      return new Response(resp.body, {
        status: 200 ,
        headers: {
          "Access-Control-Allow-Origin":"*",
          "content-type": "application/octet-stream",
          "Content-Disposition":"attachment; filename = " + fn.split("=")[1] + ".pdf"
        },
      });

    } catch (error) {
      return new Response(error, {
        status: 404,
      });
    }

  }
  
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
