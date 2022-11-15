import getTelLinkFromPhone from "./utils/getTelLinkFromPhone.js";
import getWhatsappLinkFromPhone from "./utils/getWhatsappLinkFromPhone.js";
import formatTel from "./utils/formatTel.js";
import formatCell from "./utils/formatCell.js";

const fetching = {
  async api(url) {
    const response = await fetch(url);
    return await response.json();
  },
  users(response) {
    const responseMaped = response.results.map((user) => {
      return {
        name: user.name.first + " " + user.name.last,
        nickname: user.name.first + user.name.last,
        age: user.dob.age,
        photo: user.picture.large,
        email: user.email,
        cell: user.cell,
        phone: user.phone,
        country: user.location.country,
        city: user.location.city,
      };
    });
    const responseFiltered = responseMaped.filter((item) => {
      if (item.country != "Iran") {
        return item;
      }
    });

    return responseFiltered.slice(0, 8);
  },
};

const DOM = {
  insertCards(users) {
    const usersData = users;
    usersData.forEach((user) => {
      const userGroup = document.querySelector(".user-group");

      const cardHTML = `
        <div class="header-card">
          <a href=""><i class="fab fa-behance"></i></a>
        </div>
        <div class="content-card">
          <img
            src="${user.photo}"
            alt="user card"
          />
          <div class="content-card-text">
            <div class="title-content">${user.name}</div>
            <ul class="text-content">
              <li>Tenho ${user.age} anos.</li>
              <li>Moro em ${user.city}</li>
              <li>${user.country}</li>
            </ul>
            <ul class="social-content">
              <li>
                <a href="mailto:${user.email}">
                  <i class="far fa-envelope"></i>
                  ${user.email}</a
                >
              </li>
              <li>
                <a target="_self" href="${getTelLinkFromPhone(
                  user.phone
                )}"><i class="fas fa-phone"></i>${formatTel(user.phone)}</a>
              </li>
              <li>
                <a target="_blank" href="${getWhatsappLinkFromPhone(
                  user.cell
                )}"><i class="fab fa-whatsapp"></i>${formatCell(user.cell)}</a>
              </li>
            </ul>
          </div>
          <div class="social-card">
            <a href="https://www.behance.net/${
              user.nickname
            }" data-icon="fab fa-behance" data-color="#9FC1FF"
              ><i class="fab fa-behance"></i
            ></a>
            <a href="https://facebook.com/${
              user.nickname
            }" data-icon="fab fa-facebook-f" data-color="#ACC0E9"
              ><i class="fab fa-facebook-f"></i
            ></a>
            <a href="https://twitter.com/${
              user.nickname
            }" data-icon="fab fa-twitter" data-color="#9AD9FF"
              ><i class="fab fa-twitter"></i
            ></a>
            <a href="https://www.linkedin.com/${
              user.nickname
            }" data-icon="fab fa-linkedin-in" data-color="#A4D0E7"
              ><i class="fab fa-linkedin-in"></i
            ></a>
            <a href="https://dribbble.com/${
              user.nickname
            }" data-icon="fab fa-dribbble" data-color="#FFC6E3"
              ><i class="fab fa-dribbble"></i
            ></a>
          </div>
        </div>`;
      const card = document.createElement("div");
      card.classList.add("user-card");
      card.innerHTML = cardHTML;
      userGroup.appendChild(card);
    });
  },
  mouseInto() {
    const usersCards = document.querySelectorAll(".user-card");
    usersCards.forEach((card) => {
      const socials = card.querySelectorAll(".social-card a");
      //   console.log(socials);
      socials.forEach((social) => {
        social.addEventListener("mouseenter", () => {
          const cardsHeader = card.querySelector(".header-card");
          const icon = card.querySelector(".header-card a i");

          cardsHeader.style.backgroundColor = social.dataset.color;

          setTimeout(() => {
            icon.classList = social.dataset.icon;
          }, 200);
          var css = `.user-group
            .user-card
            .content-card
            .content-card-text
            .social-content
            a:hover {
            background-color: rgb(255, 255, 255);
            color: ${social.dataset.color};
          }`;
          var style = document.createElement("style");

          if (style.styleSheet) {
            style.styleSheet.cssText = css;
          } else {
            style.appendChild(document.createTextNode(css));
          }
          document.getElementsByTagName("head")[0].appendChild(style);
        });
      });
    });
  },
};

const response = await fetching.api("https://randomuser.me/api?results=20");
const users = fetching.users(response);

DOM.insertCards(users);
DOM.mouseInto();
