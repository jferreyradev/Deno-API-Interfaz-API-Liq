
const MID_API = new URLPattern({ pathname: "/api/:action/:en/*?" });
const MID_API_BOLETA = new URLPattern({ pathname: "/api/boleta*?" });

const URL_API = "http://200.55.244.26:3005"

async function handler(req: Request): Promise<Response> {
  const match1 = MID_API_BOLETA.exec(req.url);

  if (match1) {
    try {
      const URL =
        URL_API +
        match1.pathname.input +
        (match1.search.input ? "?" + match1.search.input : "");
        
      const resp = await fetch(URL, {
        headers: {
          accept: "application/pdf",
        },
      });

      const fn = resp.headers.get("content-disposition");

      //console.log(fn.split("=")[1])

      return new Response(resp.body, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "application/pdf",
          "Content-Disposition":
            "attachment; filename = " + fn.split("=")[1] + ".pdf",
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
    let URL = "";
    let option = {};
    let content = "application/json";

    try {
      if (match.pathname.groups.action == "view" || match.pathname.groups.action == "repo") {
        URL =
          URL_API +
          match.pathname.input +
          (match.search.input ? "?" + match.search.input : "");

          option = {
            headers: {
              accept: "application/json",
            },
          }

      } else if (match.pathname.groups.action == "en") {
        URL =
          URL_API +
          "/api/" +
          match.pathname.groups.en +
          (match.search.input ? "?" + match.search.input : "");

          option = {
            headers: {
              accept: "application/json",
            },
          }

      } else if (match.pathname.groups.action == "txt") {
        URL =
          URL_API +
          match.pathname.input +
          (match.search.input ? "?" + match.search.input : "");

          content = "text/plain"

      }

      /*
      console.log("fetch to: " + URL);
      console.log("match to: " + match.pathname.groups.action);
      console.log("match to: " + match.pathname.groups.en);
      console.log(match.pathname);

      /*** */

      const resp = await fetch(URL, option);

      return new Response(resp.body, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": content ,
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
