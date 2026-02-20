const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileAvatar = document.querySelector(".profile__avatar");

etch("https://around-api.pt-br.tripleten-services.com/v1/users/me", {
  method: "GET",
  headers: {
    authorization: "4e34a240-7268-404d-bb6b-376382c7ca04",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
