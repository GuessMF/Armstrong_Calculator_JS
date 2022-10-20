//сделать валидацию шва 1-5 целые числа
//поправить 4.2 на 4.2 меняется высота и ширина на отрицательные
//поправить колличество блоков

width.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

height.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

//сделать кнопки с размером шва вместо инпута вув
console.log("heee");
line.addEventListener("keyup", function () {
  console.log(Number.isInteger(this.value));
  // console.log(2.1 % 2);
  if (this.value > 5 && this.value % this.value == 0) {
    this.value = "";
  }
  // if(){

  // }
  // if (this.value > 5 || this.value % this.value !== 0) {
  //   this.value = "";
  // }
  // this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

let razmerBlokaAVisota;
//работает если ввести больше чем 38 но грузится процессор и очень долго рендерит
calculate.addEventListener("click", () => {
  if (width.value == "" || height.value == "") {
    alert("Введите размеры комнаты");
  } else if (width.value > 35 || height.value > 35) {
    alert("Ведите число до 35");
  } else {
    a = Number(width.value);
    b = Number(height.value);
    pl = (a * b).toFixed(2); //площадь фигуры
    per = ((a + b) * 2).toFixed(2); // периметр фигуры
    bl = ((a * b) / 0.36).toFixed(1); //всего блоков по 0.36m

    oneBlock.innerHTML = "0.6m x 0.6m";
    ploshad.innerHTML = pl + "m²";
    perimetr.innerHTML = per + "m";
    blocks.innerHTML = bl + " штук";
    razmA;
    razmB;
    razmC;

    canvasDraw(width.value, height.value, Number(line.value));
  }
});
centred.addEventListener("click", () => {
  if (width.value == "" || height.value == "") {
    alert("Введите размеры комнаты");
  } else if (width.value > 35 || height.value > 35) {
    alert("Введите число до 35");
  } else {
    a = Number(width.value);
    b = Number(height.value);
    pl = (a * b).toFixed(2); //площадь фигуры
    per = ((a + b) * 2).toFixed(2); // периметр фигуры
    bl = ((a * b) / 0.36).toFixed(1); //всего блоков по 0.36m

    oneBlock.innerHTML = "0.6m x 0.6m";
    ploshad.innerHTML = pl + "m²";
    perimetr.innerHTML = per + "m";
    blocks.innerHTML = bl + " штук";
    razmA;
    razmB;
    razmC;

    canvasDrawCentred(width.value, height.value, line.value);
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
      ver = 60 + 0.5 + n * llLine; // шаг между вертикальными линиями
      hor = 60 + 0.5 + i * llLine; //шаг между горизонтальными линиями
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

  //shirinaMelkogo = clientWidth - hor - line / 2;
  // visotaMelkogo = clientHeight - ver - line / 2;

  let shirinaMelkogo;
  let visotaMelkogo;

  if (clientWidth - ver < 0) {
    shirinaMelkogo = 60 + (clientWidth - ver);
  } else {
    shirinaMelkogo = clientWidth - ver - line / 2;
  }

  if (clientHeight - hor < 0) {
    visotaMelkogo = 60 + (clientHeight - hor);
  } else {
    visotaMelkogo = canvas.height - hor - line / 2;
  }

  visotaMelkogo > 59
    ? (visotaMelkogo = visotaMelkogo - 60)
    : (visotaMelkogo = visotaMelkogo);
  shirinaMelkogo > 59
    ? (shirinaMelkogo = shirinaMelkogo - 60)
    : (shirinaMelkogo = shirinaMelkogo);

  console.log("canvhei = " + canvas.height);
  console.log("hor = " + hor);
  console.log("line/2 = " + line / 2);

  // console.log("N = " + n);
  // console.log(" I = " + i);
  // console.log("clientWidth = " + clientWidth);
  // console.log("Posledn" + ver);
  // console.log("Shirina = " + shirinaMelkogo);
  console.log("Visota = " + visotaMelkogo);

  blockHeight = `${(visotaMelkogo / 100).toFixed(2)}`;
  blockWidth = `${(shirinaMelkogo / 100).toFixed(2)}`;

  maxHeight = clientHeight - 1;

  newLine = line / 200;
  adaptiv = 60 - line;

  //отрисовка А
  if (visotaMelkogo > 0.25 && shirinaMelkogo > 0.25) {
    console.log("Vis A = " + visotaMelkogo + " Shir A = " + shirinaMelkogo);
    if (visotaMelkogo >= 7 && shirinaMelkogo >= 7) {
      ctx.fillText("a", clientWidth - 10, clientHeight - 1);
    }
    if (visotaMelkogo <= 7 || shirinaMelkogo <= 7) {
      ctx.fillText("a⤡", hor - 20, ver - 5);
    }
    razmA.innerHTML = blockHeight + "m x " + blockWidth + "m";
    littleBlockA(visotaMelkogo, shirinaMelkogo);
    lbA.style.display = "inline";
  } else {
    razmA.innerHTML = "Нет";
    lbA.style.display = "none";
  }

  //отрисовка В если его ширина больше 0
  if (shirinaMelkogo > 0.25 && visotaMelkogo > 0.25) {
    // console.log("shirina melkogo" + shirinaMelkogo);
    //console.log("visota melkogo" + visotaMelkogo);
    console.log("Vis B = " + visotaMelkogo + "  Shir B = " + shirinaMelkogo);
    if (shirinaMelkogo > 7) {
      // ctx.fillText("b", hor + centHor * 2 - 10, ver - 30);
      ctx.fillText("b", canvas.width - 10, canvas.height - visotaMelkogo - 10);
    }
    if (shirinaMelkogo < 7) {
      ctx.fillText("b→", hor - 30, ver - 30);
    }

    lbB.style.display = "inline";
    razmB.innerHTML = blockHeight + "m x " + blockWidth + "m";
    littleBlockB(adaptiv, shirinaMelkogo);
  } else {
    razmB.innerHTML = "Нет";
    lbB.style.display = "none";
  }
  //C
  if (visotaMelkogo > 0) {
    console.log("Vis C = " + visotaMelkogo + "  Shir C = " + shirinaMelkogo);
    if (visotaMelkogo >= 7) {
      ctx.fillText("c", canvas.width - shirinaMelkogo - 20, canvas.height - 1);
    }
    if (visotaMelkogo < 7) {
      ctx.fillText("c↓", hor - 60, ver - 10);
    }

    lbC.style.display = "inline";
    razmC.innerHTML = blockHeight + "x " + adaptiv / 100 + " m";
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

  shirLast = 60 + 0.5 + (Math.trunc(width / 0.6) - 1) * 60;
  visotLast = 60 + 0.5 + (Math.trunc(height / 0.6) - 1) * 60;
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

    razmA.innerHTML =
      blockHeight.toFixed(2) + "m x " + blockWidth.toFixed(2) + "m";
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
    razmB.innerHTML =
      blockHeight.toFixed(2) + "x " + (adaptiv / 100).toFixed(2) + " m";
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
    razmC.innerHTML =
      (adaptiv / 100).toFixed(2) + "m x " + blockWidth.toFixed(2) + "m";
    littleBlockC(adaptiv, shirinaMelkogo);
  } else {
    razmC.innerHTML = "Нет";
    lbC.style.display = "none";
  }

  // сделать число изменяемым и сделать зависимость размера букови от высоты куска
  // либо сделать стрелку указывающую если бука туда не влезает
  //4.2 и 4.3 тоже не высчитывает
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

  // ctx.fillStyle = "blue";
  // ctx.font = "bold 8px Arial";
  // ctx.fillText("B", centrWidth - 2, centrHeight - 1);
}
function littleBlockC(visota, shirina) {
  block = document.getElementById("blockC");
  block.classList = "testing";

  clientWidth = shirina;
  clientHeight = visota;
  block.width = clientWidth;
  block.height = clientHeight;
  // centrWidth = clientWidth / 2;
  // centrHeight = clientHeight / 2;

  let ctx = block.getContext("2d");
  ctx.lineWidth = 1;
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(0, 0, clientWidth, clientHeight);
  // ctx.fillStyle = "blue";
  // ctx.font = "bold 8px Arial";
  // ctx.fillText("C", centrWidth - 2, centrHeight - 1);
}

test.addEventListener("click", () => {
  let newCanv = document.createElement("canvas");
  let lb = document.querySelector(".littleBlocks");
  newCanv.id = "blockC";
  document.body.insertBefore(newCanv, lb);
  // let newDiv = document.createElement("div");
  // let tddd = document.querySelector(".littleBlocks");
  // newDiv.innerHTML = "hello";
  // document.insertBefore(newDiv, tddd);
});
