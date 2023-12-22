export let api_origin = process.env.CLIENT_EXPRESS_SERVER_URL;

if (window.location.origin === "http://localhost:3000") {
  api_origin = "http://localhost:8080";
} else if (window.location.origin.includes("192.168")) {
  api_origin = window.location.origin.replace("3000", "8080");
} else {
  api_origin = "https://api.ef2023.com";
}
