width.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

height.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

line.addEventListener("keyup", function () {
  if (this.value > 5) {
    this.value = "";
  }
  if (this.value < 1) {
    //setTimeout(alert("ggg"), 20000);
    // alert("Введите ширину шва больше 10 мм");
    this.value = "";
  }
  if (this.value % 1 !== 0) {
    this.value = "";
  }
});

//работает если ввести больше чем 38 но грузится процессор и очень долго рендерит
calculate.addEventListener("click", () => {
  if (width.value == "" || height.value == "") {
    alert("Введите размеры комнаты");
  } else if (width.value > 350000 || height.value > 350000) {
    alert("Ведите число до 35");
  } else {
    a = Number(width.value / 1000);
    b = Number(height.value / 1000);
    pl = (a * b).toFixed(2); //площадь фигуры
    per = ((a + b) * 2).toFixed(2); // периметр фигуры
    bl = ((a * b) / 0.36).toFixed(1); //всего блоков по 0.36m
    blocksSize = 60 - line.value;
    oneBlock.innerHTML = 600 + "mm x " + 600 + "mm";
    ploshad.innerHTML = pl + "m²";
    perimetr.innerHTML = per + "m";
    blocks.innerHTML = bl + " штук";
    razmA;
    razmB;
    razmC;

    canvasDraw(width.value / 1000, height.value / 1000, line.value / 10);
  }
});
centred.addEventListener("click", () => {
  if (width.value == "" || height.value == "") {
    alert("Введите размеры комнаты");
  } else if (width.value > 3500 || height.value > 3500) {
    alert("Введите число до 35");
  } else {
    a = Number(width.value / 1000);
    b = Number(height.value / 1000);
    pl = (a * b).toFixed(2); //площадь фигуры
    per = ((a + b) * 2).toFixed(2); // периметр фигуры
    bl = ((a * b) / 0.36).toFixed(1); //всего блоков по 0.36m

    oneBlock.innerHTML = "600 mm x 600 mm";
    ploshad.innerHTML = pl + "m²";
    perimetr.innerHTML = per + "m";
    blocks.innerHTML = bl + " штук";
    razmA;
    razmB;
    razmC;

    canvasDrawCentred(width.value / 1000, height.value / 1000, line.value / 10);
  }
});

razmA;
razmB;
razmC;
// минимум нарезки
function canvasDraw(width, height, line) {
  littleBlocksView = document.querySelector(".littleBlocks");
  littleBlocksView.style.display = "grid";
  lbA = document.querySelector(".divA");
  lbB = document.querySelector(".divB");
  lbC = document.querySelector(".divC");
  document.querySelector(".parametrs").style.display = "table-row";
  canvas = document.getElementById("canvas");
  canvas.classList = "canv";
  clientWidth = width * 100;
  clientHeight = height * 100;
  canvas.width = clientWidth;
  canvas.height = clientHeight;

  canvas.style.border = "black solid " + `${line}` + "px";

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f8f8f8";
  ctx.strokeStyle = "black";
  ctx.lineWidth = line;

  llLine = 60 + Number(line);

  for (i = 0; i < Math.trunc(width / 0.6); i++) {
    for (n = 0; n < Math.trunc(height / 0.6); n++) {
      ver = 60 + n * llLine; // шаг между вертикальными линиями
      hor = 60 + i * llLine; //шаг между горизонтальными линиями
      ctx.fillRect(0, 0, clientWidth, clientHeight);
      ctx.moveTo(hor, 0);
      ctx.lineTo(hor, clientHeight);
      ctx.moveTo(0, ver);
      ctx.lineTo(clientWidth, ver);
      ctx.stroke();
    }
  }

  //подписанные
  ctx.fillStyle = "red";
  ctx.font = 12 + "pt Arial";

  centHor = (clientWidth - hor) / 2; //центр кравнего блока для отцентровски буквы
  centVer = (clientHeight - ver) / 2;

  let shirinaMelkogo;
  let visotaMelkogo;

  if (clientWidth - hor < 0) {
    shirinaMelkogo = 60 + (clientWidth - hor);
  } else {
    //shirinaMelkogo = clientWidth - hor - line / 2;
    shirinaMelkogo = clientWidth - hor;
  }

  if (clientHeight - ver < 0) {
    visotaMelkogo = 60 + (clientHeight - ver);
    // visotaMelkogo = 60;
  } else {
    //visotaMelkogo = canvas.height - ver - line / 2;
    visotaMelkogo = canvas.height - ver;
  }

  visotaMelkogo > 59.9
    ? (visotaMelkogo = visotaMelkogo - 60)
    : (visotaMelkogo = visotaMelkogo);
  shirinaMelkogo > 59.9
    ? (shirinaMelkogo = shirinaMelkogo - 60)
    : (shirinaMelkogo = shirinaMelkogo);

  visotaMelkogo < 0
    ? (visotaMelkogo = 60 + visotaMelkogo)
    : (visotaMelkogo = visotaMelkogo);
  shirinaMelkogo < 0 ? 60 + shirinaMelkogo : (shirinaMelkogo = shirinaMelkogo);

  blockHeight = `${(visotaMelkogo / 100).toFixed(3)}`;
  blockWidth = `${(shirinaMelkogo / 100).toFixed(3)}`;

  maxHeight = clientHeight - 1;

  newLine = line / 200;
  // adaptiv = 60 - line;
  adaptiv = 60;

  //отрисовка А
  if (visotaMelkogo > 0.25 && shirinaMelkogo > 0.25) {
    if (visotaMelkogo >= 7 && shirinaMelkogo >= 7) {
      ctx.fillText("a", clientWidth - 10, clientHeight - 1);
    }
    if (visotaMelkogo < 7 || shirinaMelkogo <= 7) {
      ctx.fillText("a⤡", hor - 20, ver - 5);
    }
    razmA.innerHTML = blockHeight * 1000 + "mm x " + blockWidth * 1000 + "mm";
    littleBlockA(visotaMelkogo, shirinaMelkogo);
    lbA.style.display = "inline";
  } else {
    razmA.innerHTML = "Нет";
    lbA.style.display = "none";
  }

  //отрисовка В если его ширина больше 0
  if (shirinaMelkogo > 0.25 && visotaMelkogo > 0.25) {
    if (shirinaMelkogo >= 7) {
      ctx.fillText("b", canvas.width - 10, canvas.height - visotaMelkogo - 10);
    }
    if (shirinaMelkogo < 7) {
      ctx.fillText("b→", hor - 30, ver - 30);
    }

    lbB.style.display = "inline";
    razmB.innerHTML = adaptiv * 10 + "mm x " + blockWidth * 1000 + "mm";
    littleBlockB(adaptiv, shirinaMelkogo);
  } else {
    razmB.innerHTML = "Нет";
    lbB.style.display = "none";
  }
  //C
  if (visotaMelkogo > 0) {
    if (visotaMelkogo >= 7) {
      ctx.fillText("c", canvas.width - shirinaMelkogo - 20, canvas.height - 1);
    }
    if (visotaMelkogo < 7) {
      ctx.fillText("c↓", hor - 60, ver - 10);
    }

    lbC.style.display = "inline";
    razmC.innerHTML = blockHeight * 1000 + "mm x " + adaptiv * 10 + " mm";
    littleBlockC(visotaMelkogo, adaptiv);
  } else {
    razmC.innerHTML = "Нет";
    lbC.style.display = "none";
  }
}

//выравненные
function canvasDrawCentred(width, height, line) {
  littleBlocksView = document.querySelector(".littleBlocks");

  lbA = document.querySelector(".divA");
  lbB = document.querySelector(".divB");
  lbC = document.querySelector(".divC");
  document.querySelector(".parametrs").style.display = "table-row";

  littleBlocksView.style.display = "grid";
  canvas = document.getElementById("canvas");
  canvas.classList = "canv";
  clientWidth = width * 100;
  clientHeight = height * 100;
  canvas.width = clientWidth;
  canvas.height = clientHeight;

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f8f8f8";
  ctx.strokeStyle = "black";
  ctx.lineWidth = line;
  canvas.style.border = "black solid " + `${line}` + "px";

  shirLast = 60 + (Math.trunc(width / 0.6) - 1) * 60;
  visotLast = 60 + (Math.trunc(height / 0.6) - 1) * 60;
  kraiVert = (clientWidth - shirLast) / 2;
  kraiHor = (clientHeight - visotLast) / 2;

  //либо мутный канвас либо края чуть отличаются
  if (kraiVert < 0) {
    kraiVert = -0.4;
  }
  if (kraiHor < 0) {
    kraiHor = -0.4;
  }

  for (i = 0; i < Math.trunc(width / 0.6) + 1; i++) {
    for (n = 0; n < Math.trunc(height / 0.6) + 1; n++) {
      ver = kraiHor + 0.375 + n * 60; // шаг между вертикальными линиями
      hor = kraiVert + 0.375 + i * 60; //шаг между горизонтальными линиями

      ctx.fillRect(0, 0, clientWidth, clientHeight); //фон
      ctx.moveTo(hor, 0);
      ctx.lineTo(hor, clientHeight);
      ctx.moveTo(0, ver);
      ctx.lineTo(clientWidth, ver);
      ctx.stroke();
    }
  }
  corVer = (n * line * 10) / 2;
  corHor = (i * line * 10) / 2;

  visotaMelkogo = kraiHor - line / 2;
  shirinaMelkogo = kraiVert - line / 2;

  adaptiv = 60 - line;

  blockHeight = visotaMelkogo / 100;
  blockWidth = shirinaMelkogo / 100;

  ctx.fillStyle = "red";
  ctx.font = "8pt Arial";

  //блок А
  if (visotaMelkogo > 0.25 && shirinaMelkogo > 0.25) {
    if (shirinaMelkogo < 7 || visotaMelkogo < 7) {
      ctx.fillText("⤡a", shirinaMelkogo + line * 2, kraiHor + 10);
    }
    if (shirinaMelkogo > 7 && visotaMelkogo > 7) {
      ctx.fillText("a", shirinaMelkogo - 7, visotaMelkogo);
    }

    height = blockHeight.toFixed(2) * 1000 - corHor;
    width = blockWidth.toFixed(2) * 1000 - corVer;
    razmA.innerHTML = height + "mm x " + width + "mm";
    littleBlockA(visotaMelkogo, shirinaMelkogo);
    lbA.style.display = "inline";
  } else {
    razmA.innerHTML = "Нет";
    lbA.style.display = "none";

    littleBlockA(visotaMelkogo, shirinaMelkogo);
  }

  //B
  if (visotaMelkogo > 0.25) {
    if (visotaMelkogo < 7) {
      ctx.fillText("↑b", shirinaMelkogo + 30, kraiHor + 10);
    }
    if (visotaMelkogo > 7) {
      ctx.fillText("b", shirinaMelkogo + 30, visotaMelkogo);
    }
    lbB.style.display = "inline";
    razmB.innerHTML = height + "mm x " + 600 + " mm";
    littleBlockB(visotaMelkogo, adaptiv);
  } else {
    razmB.innerHTML = "Нет";
    lbB.style.display = "none";
  }

  //C
  if (shirinaMelkogo > 0.25) {
    if (shirinaMelkogo > 7) {
      ctx.fillText("c", shirinaMelkogo - 5, visotaMelkogo + 60);
    }
    if (shirinaMelkogo < 7) {
      ctx.fillText("←c", shirinaMelkogo + line * 2, visotaMelkogo + 60);
    }

    lbC.style.display = "inline";
    razmC.innerHTML = 600 + "mm x " + width + "mm";
    littleBlockC(adaptiv, shirinaMelkogo);
  } else {
    razmC.innerHTML = "Нет";
    lbC.style.display = "none";
  }
}

function littleBlockA(visota, shirina) {
  block = document.getElementById("blockA");
  block.classList = "testing";

  clientHeight = visota;
  clientWidth = shirina;

  block.width = clientWidth;
  block.height = clientHeight;

  let ctx = block.getContext("2d");
  ctx.lineWidth = 1;
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(0, 0, clientWidth, clientHeight);
}
function littleBlockB(visota, shirina) {
  block = document.getElementById("blockB");
  block.classList = "testing";

  clientHeight = visota;
  clientWidth = shirina;

  block.width = clientWidth;
  block.height = clientHeight;

  let ctx = block.getContext("2d");
  ctx.lineWidth = 1;
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(0, 0, clientWidth, clientHeight);
}
function littleBlockC(visota, shirina) {
  block = document.getElementById("blockC");
  block.classList = "testing";

  clientWidth = shirina;
  clientHeight = visota;
  block.width = clientWidth;
  block.height = clientHeight;

  let ctx = block.getContext("2d");
  ctx.lineWidth = 1;
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(0, 0, clientWidth, clientHeight);
}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

testButt.addEventListener("click", () => {
  document.querySelector(".newTest").innerHTML = "";
  parametrsClear("A");
  parametrsClear("B");
  parametrsClear("C");
  cssDraw();
});

function cssDraw() {
  const LINEWIDTH = Number(line.value);
  const WIDTH = Math.ceil(width.value / (600 + LINEWIDTH)); // всего блоков по ширине
  const HEIGHT = Math.ceil(height.value / (600 + LINEWIDTH));
  const FULLBLOCKSWIDTH = Math.floor(width.value / (600 + LINEWIDTH)); //целые блоки по ширине
  const FULLBLOCKSHEIGHT = Math.floor(height.value / (600 + LINEWIDTH));

  let bottomBlocksHeight;
  let rightBlocksWidth;

  Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH)) / 10 == 0
    ? (rightBlocksWidth = 60)
    : (rightBlocksWidth =
        Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH)) / 10);

  Number(height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH)) / 10 == 0
    ? (bottomBlocksHeight = 60)
    : (bottomBlocksHeight =
        Number(height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH)) / 10);

  let testDiv = document.querySelector(".newTest");
  let table = document.createElement("div");
  table.classList.add("table");
  testDiv.append(table);

  for (i = 0; i < HEIGHT; i++) {
    let newTr = document.createElement("tr");
    i == HEIGHT - 1
      ? (newTr.style.height = `${bottomBlocksHeight + "px"}`)
      : (newTr.style.height = "60px");
    newTr.className = "newTr";
    table.append(newTr);

    for (n = 0; n < WIDTH; n++) {
      if (
        i == HEIGHT - 1 &&
        n == WIDTH - 1 &&
        HEIGHT - 1 !== 0 &&
        WIDTH - 1 !== 0 &&
        rightBlocksWidth < 60 &&
        bottomBlocksHeight < 60
      ) {
        let newTd = document.createElement("td");
        newTd.className = "A";

        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.width = `${rightBlocksWidth + "px"}`;
        newTd.style.height = `${bottomBlocksHeight + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(rightBlocksWidth, bottomBlocksHeight, "A");
        razmA.textContent = "";
        razmA.textContent = `${
          bottomBlocksHeight * 10 + " mm x " + rightBlocksWidth * 10 + " mm"
        }`;
        console.log("TEST");
      } else if (n == WIDTH - 1 && WIDTH - 1 !== 0 && rightBlocksWidth < 60) {
        let newTd = document.createElement("td");
        newTd.className = "B";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.width = `${rightBlocksWidth + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(rightBlocksWidth, 60, "B");
        razmB.textContent = "";
        razmB.textContent = `${"600 mm x " + rightBlocksWidth * 10 + " mm"}`;
      } else if (
        i == HEIGHT - 1 &&
        HEIGHT - 1 !== 0 &&
        bottomBlocksHeight < 60
      ) {
        let newTd = document.createElement("td");
        newTd.className = "C";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.height = `${bottomBlocksHeight + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(60, bottomBlocksHeight, "C");
        razmC.textContent = "";
        razmC.textContent = `${bottomBlocksHeight * 10 + " mm x 600 mm"}`;
      } else {
        let newTd = document.createElement("td");
        newTd.className = "newTd";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTr.append(newTd);
      }
    }
  }
}

//
//
//
//
//
//
function parametrsClear(letter) {
  let testLittle = document.querySelector(`.testLittle${letter}`);
  testLittle.textContent = "";
  let razm = document.getElementById(`razm${letter}`);
  razm.textContent = "";
}

function smallBlockParametrs(smallWidth, smallHeight, letter) {
  let testLittle = document.querySelector(`.testLittle${letter}`);
  testLittle.textContent = "";
  let littleBlock = document.createElement("td");
  littleBlock.style.width = `${smallWidth + "px"}`;
  littleBlock.style.height = `${smallHeight + "px"}`;
  littleBlock.classList.add(`${letter}`);
  littleBlock.style.border = "black solid 1px";
  testLittle.append(littleBlock);
}

reset.addEventListener("click", () => {
  document.querySelector(".newTest").innerHTML = "";
  parametrsClear("A");
  parametrsClear("B");
  parametrsClear("C");
  cssDrawCentred();
});

function cssDrawCentred() {
  const LINEWIDTH = Number(line.value);
  const WIDTH = Math.ceil(width.value / (600 + LINEWIDTH)); // всего блоков по ширине
  const HEIGHT = Math.ceil(height.value / (600 + LINEWIDTH));
  const FULLBLOCKSWIDTH = Math.floor(width.value / (600 + LINEWIDTH)); //целые блоки по ширине
  const FULLBLOCKSHEIGHT = Math.floor(height.value / (600 + LINEWIDTH));

  console.log(WIDTH + " Vsego po shirine");
  let bottomBlocksHeight;
  let rightBlocksWidth;

  Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH)) / 10 == 0 // проверка на размер блока == 0px
    ? (rightBlocksWidth = 60)
    : (rightBlocksWidth =
        Number(width.value - FULLBLOCKSWIDTH * (600 + LINEWIDTH) - LINEWIDTH) /
        10);

  Number(height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH)) / 10 == 0
    ? (bottomBlocksHeight = 60)
    : (bottomBlocksHeight =
        Number(
          height.value - FULLBLOCKSHEIGHT * (600 + LINEWIDTH) - LINEWIDTH
        ) / 10);

  let testDiv = document.querySelector(".newTest");
  let table = document.createElement("div");
  table.classList.add("table");
  testDiv.append(table);

  let shir = WIDTH;
  let vist = HEIGHT;

  rightBlocksWidth == 60 ? (shir = WIDTH) : (shir = WIDTH + 1);
  bottomBlocksHeight == 60 ? (vist = HEIGHT) : (vist = HEIGHT + 1);

  for (i = 0; i < vist; i++) {
    let newTr = document.createElement("tr");

    i == 0 && bottomBlocksHeight / 2 > 0
      ? (newTr.style.height = `${bottomBlocksHeight / 2 + "px"}`)
      : (newTr.style.height = "30px");
    i == HEIGHT && bottomBlocksHeight / 2 > 0
      ? (newTr.style.height = `${bottomBlocksHeight / 2 + "px"}`)
      : (newTr.style.height = "30px");

    (i == 0 || i == HEIGHT) && bottomBlocksHeight < 60
      ? (newTr.style.height = `${bottomBlocksHeight / 2 + "px"}`)
      : (newTr.style.height = "60px");

    newTr.className = "newTr";
    table.append(newTr);

    for (n = 0; n < shir; n++) {
      if (
        (n == 0 || n == WIDTH) &&
        rightBlocksWidth < 60 &&
        (i == 0 || i == HEIGHT) &&
        bottomBlocksHeight < 60
      ) {
        let newTd = document.createElement("td");
        newTd.className = "A";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.width = `${rightBlocksWidth / 2 + "px"}`;
        newTd.style.height = `${bottomBlocksHeight / 2 + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(rightBlocksWidth / 2, bottomBlocksHeight / 2, "A");
        razmA.textContent = "";
        razmA.textContent = `${
          (bottomBlocksHeight / 2) * 10 +
          " mm x " +
          (rightBlocksWidth / 2) * 10 +
          " mm"
        }`;
      } else if ((n == 0 || n == WIDTH) && rightBlocksWidth < 60) {
        let newTd = document.createElement("td");
        newTd.className = "B";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.width = `${rightBlocksWidth / 2 + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(rightBlocksWidth / 2, 60, "B");
        razmB.textContent = "";
        razmB.textContent = `${
          "600 mm x " + (rightBlocksWidth / 2) * 10 + " mm"
        }`;
      } else if ((i == 0 || i == HEIGHT) && bottomBlocksHeight < 60) {
        let newTd = document.createElement("td");
        newTd.className = "C";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTd.style.height = `${bottomBlocksHeight / 2 + "px"}`;
        newTr.append(newTd);
        smallBlockParametrs(60, bottomBlocksHeight / 2, "C");
        razmC.textContent = "";
        razmC.textContent = `${(bottomBlocksHeight / 2) * 10 + " mm x 600 mm"}`;
      } else {
        let newTd = document.createElement("td");
        newTd.className = "newTd";
        newTd.style.border = "black solid " + `${LINEWIDTH / 2}` + "px";
        newTr.append(newTd);
      }
    }
  }
}
