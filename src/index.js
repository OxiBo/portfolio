// https://gist.github.com/cobyism/4730490


import './index.scss';


// console.log("connected?????");



// TODO
const pdfFileName = "pdf-docs/100q.pdf";

// exclude nav link to pdf file
const navLinksAll = document.querySelectorAll("#navigation li a");
const navLinks = Array.prototype.filter.call(navLinksAll, function (node) {
    return node.getAttribute("href") !== pdfFileName;
});

// variables
const ulProjectsList = document.getElementById("projects-list");
const elements = {
  menuButton: document.getElementById("toggle-menu"),
  menuBarIcon: document.querySelector(".fa-bars"),
  menuClose: document.querySelector(".fa-window-close"),
  navbar: document.querySelector(".collapsible-nav"),
  navLinks, // document.querySelectorAll("#navigation li a"), without the link to pdg file
  section: document.querySelectorAll("section"),
  ulLanguages: document.getElementById("languages"),
  ulProjectsList,
  liProjectsList: ulProjectsList.children,
};
// programing languages icons - https://icon-icons.com/download/67193/PNG/512/
const languagesIcons = {
  HTML5: "HTML5_icon.png",
  CSS: "CSS_icon.png",
  SASS: "scss_icon.png",
  Bootstrap: "bootstrap_icon.png",
  Javascript: "javascript-icon.png",
  React: "react_icon.png",
  Redux: "redux_icon.png",
  Node: "nodejs-icon.png",
  SQL: "sql_icon.png",
  Mongo: "mongo_icon.png",
  GraphQL: "graphql_icon.png",
  Prisma: "prisma_icon.png",
  Webpack: "webpack_icon.png",
  Github: "github_icon.png",
  Heroku: "heroku_icon.png",
};

// projects list
const projects = [
  {
    name: "Wikipedia Viewer",
    description: "Search Wikipedia entries and see the results",
    image: "wiki-viewer.png",
    url: "https://codepen.io/OxiBo/full/XZrZjo/",
    github: "",
  },
  {
    name: "Random Quote Engine",
    description: "Find random quote",
    image: "random-quote.png",
    url: "https://codepen.io/OxiBo/full/rpPYOq/",
    github: "https://github.com/OxiBo/random-quote-machine-react",
  },
  {
    name: "Local Weather APP",
    description: "Shows local weather with respective background",
    image: "local-weather.png",
    url: "https://codepen.io/OxiBo/full/opVJVe",
    github: "https://github.com/OxiBo/local-weather-app-react",
  },
  {
    name: "Product Landing Page",
    description: "Example of a product landing home page",
    image: "product-landing.png",
    url: "https://codepen.io/OxiBo/full/GBWqBR",
    github: "https://github.com/OxiBo/Product-Landing-Page",
  },
  {
    name: "Technical Docs Page",
    description: "Example of technical documentation page",
    image: "tech-page.png",
    url: "https://codepen.io/OxiBo/full/Zjjzzm",
    github: "https://github.com/OxiBo/Technical-documentation-page",
  },
  {
    name: "Markdown Previewer",
    description: "Working markdown previewer",
    image: "markdown-previewer.png",
    url: "https://codepen.io/OxiBo/full/LXyaeB",
    github: "https://github.com/OxiBo/markdown-previewer",
  },
  {
    name: "Drum Machine",
    description: "Working drum machine",
    image: "drum-machine.png",
    url: "https://codepen.io/OxiBo/full/XOpdpb",
    github: "https://github.com/OxiBo/drum-machine-refactor",
  },
  {
    name: "JS Calculator",
    description: "JavaScript Calculator",
    image: "js-calculator.png",
    url: "https://codepen.io/OxiBo/full/zYOzNmE",
    github: "https://github.com/OxiBo/javascript-calculator",
  },
  {
    name: "Pomodoro Clock",
    description: "Pomodoro Technique (a time management method) implementation",
    image: "pomodoro-clock.png",
    url: "https://codepen.io/OxiBo/full/pooJMJQ",
    github: "https://github.com/OxiBo/pomodoro-clock",
  },
  {
    name: "Twitch TV Streamers",
    description: "View and lookup Twitch TV streamers",
    image: "twitch.png",
    url: "https://codepen.io/OxiBo/full/vddYrz",
    github: "https://github.com/OxiBo/twitch-tv-app-react-redux",
  },

  {
    name: "Login App",
    description: "Login using passport strategies functionality",
    image: "login-app.png",
    url: "",
    github: "https://github.com/OxiBo/loginApp"
  },
  {
    name: "Online Store",
    description: "Online store with login and pay via stripe functionality",
    image: "express-playground.png",
    url: "https://fullstack-playground.herokuapp.com/",
    github: "https://github.com/OxiBo/express-react-playground"
  },
  {
    name: "Blog",
    description: "Working blog with comments, likes, user lists",
    image: "blog-app.png",
    url: "https://dev-blog-oxibo.herokuapp.com/",
    github: "https://github.com/OxiBo/dev-blog-app"
  },
  {
    name: "Market Place",
    description: "Sell, buy, review purchases (graphQL backend)",
    image: "market-app.png",
    url: "",
    github: "https://github.com/OxiBo/market-app-graphql-prisma"
  },
  {
    name: "Shop&Cook",
    description: "Find recipes, make list of favorites, create and email shopping list",
    image: "shop-cook.png",
    url: "https://shop-cook.herokuapp.com/",
    github: "https://github.com/OxiBo/shop-cook"
  }
];

(function () {
  const {
    menuButton,
    menuBarIcon,
    menuClose,
    navbar,
    ulLanguages,
    ulProjectsList,
    navLinks,
    offsetTop,
    section,
    liProjectsList,
  } = elements;
  // open collapsible menu
  menuButton.addEventListener("click", () => {
    navbar.classList.toggle("open");
    menuBarIcon.classList.toggle("open");
    menuClose.classList.toggle("closeMenu");
  });

  //https://stackoverflow.com/questions/54605406/closing-a-menu-on-an-outside-click-pure-javascript
  // When the user clicks anywhere outside of the menu window, close menu
  window.addEventListener("click", function (event) {
    // console.log(navbar.className.includes('open'))
    if (
      event.target.closest("button#toggle-menu") !== menuButton &&
      navbar.className.includes("open")
    ) {
      navbar.classList.remove("open");
      menuBarIcon.classList.toggle("open");
      menuClose.classList.toggle("closeMenu");
    }
  });

  // smooth scroll - https://webdesign.tutsplus.com/tutorials/smooth-scrolling-vanilla-javascript--cms-35165

  // const navFiltered = Array.prototype.filter.call(navLinks, function (node) {
  //   return node.attributes.download ? null : node;
  // });
  // console.log(navFiltered);
  for (const link of navLinks) {
    // console.log(link);
    link.addEventListener("click", clickHandler);
  }

  function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
      top: offsetTop,
      behavior: "smooth",
    });
  }

  // scrollspy - https://codepen.io/zchee/pen/ogzvZZ
  // TODO - Intersection Observer API https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
  const sections = {};
  let i = 0;

  // iterate over sections (it is not an array but array-like that is why need to use Array.prototype and call()) to get sections ids and offset (position)
  Array.prototype.forEach.call(section, function (e) {
    sections[e.id] = e.offsetTop;
  });

  window.onscroll = function () {
    const scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;

    for (i in sections) {
      if (sections[i] <= scrollPosition) {
        // document.querySelector(".active").setAttribute("class", " ");
        document.querySelector(".active").classList.remove("active");
        document
          .querySelector("a[href*=" + i + "]")
          .closest("li")
          .classList.add("active");
      }
    }
  };

  // render skills(languages) icons
  /*    --- parcel-bundler does not load images from js file automatically. This work around makes it possible to use images. with this import - import langIcons from "./styles/images/skillsIcons/*.*"; // https://github.com/parcel-bundler/parcel/issues/1668 ;
   I copied images manually into dist folder because I wanted to map over the images in a certain order, which did not work if the images were copied to dist with this approach
   Object.keys(langIcons).map((key) => {
    // console.log(langIcons[key].png);
    languages.push(`<li><img src="${langIcons[key].png}"
                                    alt="${key}"/></li>`);
  });
  */

  let languages = [];
  Object.keys(languagesIcons).map((key) => {
    languages.push(
      `<li><img src="./gallery/skillsIcons/${languagesIcons[key]}" alt="${key}"/><p>${key}</p></li>`
    );
  });
  languages = languages.join().replace(/,/gi, "");
  ulLanguages.insertAdjacentHTML("afterbegin", languages);

  // render projects
  const projectsList = projects
    .map(
      ({ name, description, image, url, github }) =>
        `<li><figure><img src="./gallery/projects-imgs/${image}" alt=${name}/><p>${name}</p></figure>
        <figcaption><p>${description}</p><a href=${url || github} target="_blank">View Project</a></figcaption>
        </li>`
    )
    .join()
    .replace(/,/gi, "");
  // console.log(projectsList);
  ulProjectsList.insertAdjacentHTML("afterbegin", projectsList);

  // highlight hoovered project and dim all siblings
  /*
  Array.prototype.forEach.call(liProjectsList, (li) => {
    li.addEventListener("mouseenter", (e) => {
      Array.prototype.forEach.call(liProjectsList, (li) => {
        li.classList.remove("highlighted");
        li.classList.remove("dimmed");
      });
      li.classList.add("highlighted");
      const lisToDim = ulProjectsList.querySelectorAll("li:not(.highlighted)");
      Array.prototype.forEach.call(lisToDim, (li) => {
        li.classList.add("dimmed");
      });
    });
  });
  Array.prototype.forEach.call(liProjectsList, (li) => {
    li.addEventListener("mouseleave", (e) => {
      Array.prototype.forEach.call(liProjectsList, (li) => {
        li.classList.remove("dimmed");
        li.classList.remove("highlighted");
      });
    });
  }); 
  */
})();

// (function() {
//   window.onresize = displayWindowSize;
//   window.onload = displayWindowSize;

//   function displayWindowSize() {
//     let myWidth = window.innerWidth;
//     let myHeight = window.innerHeight;
//     // your size calculation code here
//     console.log(myWidth)
//     // document.getElementById("screen").innerHTML = myWidth + "x" + myHeight;
//   };

// })();


