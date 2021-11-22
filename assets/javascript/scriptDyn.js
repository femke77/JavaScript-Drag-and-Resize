let count = 0;
var leftPos = 0;
var topPos = 100;
var isResizing = false;

function createBox() {
  count++;
  leftPos += 20;
  topPos += 20;

  let boxId = "box-" + count;
  let container = document.getElementById("boxes");
  let box = document.createElement("div");
  box.id = boxId;
  box.className = "box";
  container.appendChild(box);

  // Create and append resizer divs
  let ne = document.createElement("div");
  let nw = document.createElement("div");
  let se = document.createElement("div");
  let sw = document.createElement("div");

  box.appendChild(ne);
  box.appendChild(nw);
  box.appendChild(se);
  box.appendChild(sw);

  ne.setAttribute("class", "resizer ne");
  nw.setAttribute("class", "resizer nw");
  sw.setAttribute("class", "resizer sw");
  se.setAttribute("class", "resizer se");

  box.style.position = "absolute";
  box.style.top = topPos + "px";
  box.style.left = leftPos + "px";

  let textbox = document.createElement("p");
  let userText = document.getElementById("textbox").value;
  if (userText === "") {
    userText = boxId;
  }
  let content = document.createTextNode(userText);
  textbox.className = "box-text"
  textbox.appendChild(content);
  box.appendChild(textbox);


  box.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    box.addEventListener("mousemove", mousemove);
    box.addEventListener("mouseup", mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
      if (!isResizing) {
        let newX = prevX - e.clientX;
        let newY = prevY - e.clientY;

        const rect = box.getBoundingClientRect();

        box.style.left = rect.left - newX + "px";
        box.style.top = rect.top - newY + "px";

        prevX = e.clientX;
        prevY = e.clientY;
      }
    }

    function mouseup() {
      box.removeEventListener("mousemove", mousemove);
      box.removeEventListener("mouseup", mouseup);
    }
  }

  let resizers = document.querySelectorAll(".resizer");
  let currentResizer;

  for (let resizer of resizers) {
    resizer.addEventListener("mousedown", mousedown);

    function mousedown(e) {
      currentResizer = e.target;
      isResizing = true;

      let prevX = e.clientX;
      let prevY = e.clientY;

      box.addEventListener("mousemove", mousemove);
      box.addEventListener("mouseup", mouseup);

      function mousemove(e) {
        const rect = box.getBoundingClientRect();

        if (currentResizer.classList.contains("se")) {
          box.style.width = rect.width - (prevX - e.clientX) + "px";
          box.style.height = rect.height - (prevY - e.clientY) + "px";
        } else if (currentResizer.classList.contains("sw")) {
          box.style.width = rect.width + (prevX - e.clientX) + "px";
          box.style.height = rect.height - (prevY - e.clientY) + "px";
          box.style.left = rect.left - (prevX - e.clientX) + "px";
        } else if (currentResizer.classList.contains("ne")) {
          box.style.width = rect.width - (prevX - e.clientX) + "px";
          box.style.height = rect.height + (prevY - e.clientY) + "px";
          box.style.top = rect.top - (prevY - e.clientY) + "px";
        } else {
          box.style.width = rect.width + (prevX - e.clientX) + "px";
          box.style.height = rect.height + (prevY - e.clientY) + "px";
          box.style.top = rect.top - (prevY - e.clientY) + "px";
          box.style.left = rect.left - (prevX - e.clientX) + "px";
        }
        prevX = e.clientX;
        prevY = e.clientY;
      }

      function mouseup() {
            box.removeEventListener("mousemove", mousemove);
            box.removeEventListener("mouseup", mouseup);
            isResizing = false;
        }

    }
  }
}
