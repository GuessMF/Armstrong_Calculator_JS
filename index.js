//валидация инпутов только на цифры и замена запятой на точку
width.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

height.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
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

    canvasDraw(width.value, height.value, line.value);
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
  console.log(clientWidth + "clientWidthCanvas");
  console.log(canvas.width + "canvas.width");

  canvas.style.border = "black solid " + `${line}` + "px";
  console.log("line " + line);
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f8f8f8";
  ctx.strokeStyle = "black";
  ctx.lineWidth = line;
  console.log(line + "line");

  llLine = 60 + Number(line);
  console.log(llLine);
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
  ctx.font = "8pt Arial";

  centHor = (clientWidth - hor) / 2; //центр кравнего блока для отцентровски буквы
  centVer = (clientHeight - ver) / 2;

  console.log(centHor + "centHor");
  console.log("melkii kysok raschet" + Number(60 + centHor));
  shirA = Number(60 + centHor - line);
  visotA = Number(60 + centVer - line);
  console.log("visotaA" + centVer);
  //visotA = Number(60 + centVer);

  blockHeight = `${((clientHeight - ver) / 100).toFixed(2)}`;
  blockWidth = `${((clientWidth - hor) / 100).toFixed(2)}`;
  maxHeight = clientHeight - 1;

  // console.log(line / 200);
  // console.log(blockHeight);

  newLine = line / 200;
  //отрисовка А если обе стороны больше 0
  if (blockHeight > 0 && blockWidth > 0) {
    ctx.fillText("a", hor + centHor, clientHeight - 1);
    razmA.innerHTML = "первое";
    //razmA.innerHTML = blockHeight + "m x " + blockWidth + "m";
    littleBlockA(blockHeight - line / 200, blockWidth - line / 200);
    lbA.style.display = "inline";
    console.log("1111111111111111");
  } else if (shirA > 60 && visotA > 60) {
    ctx.fillText("a", hor + centHor, clientHeight - 1);
    razmA.innerHTML = "второе";
    // razmA.innerHTML = blockHeight + "m x " + blockWidth + "m";
    littleBlockA(visotA, shirA);
    lbA.style.display = "inline";
    console.log("2222222222222222");
  }
  // if (blockHeight > 0 && blockWidth > 0) {
  //   ctx.fillText("a", hor + centHor, clientHeight - 1);
  //   razmA.innerHTML = blockHeight + "m x " + blockWidth + "m";
  //   littleBlockA(blockHeight - line / 200, blockWidth - line / 200);
  //   lbA.style.display = "inline";
  // } else {
  //   razmA.innerHTML = "0";
  //   !littleBlockA(blockHeight - line / 200, blockWidth - line / 200);
  //   lbA.style.display = "none";
  // }

  //отрисовка В если его ширина больше 0
  if (blockWidth > 0) {
    ctx.fillText("b", hor + centHor, ver - 1);
    razmB.innerHTML = "0.6m x " + blockWidth + "m";
    littleBlockB(0.6 - newLine / 0.6, blockWidth - newLine / 0.6);

    lbB.style.display = "inline";
  } else {
    razmB.innerHTML = "0";
    !littleBlockB(0.6 - line / 200, blockWidth - line / 200);
    lbB.style.display = "none";
  }

  //отрисовка С если его высота больше 0
  if (blockHeight > 0) {
    ctx.fillText("c", hor - 30, maxHeight);
    razmC.innerHTML = blockHeight + "m x 0.6m";
    littleBlockC(blockHeight - line / 200, 0.6 - line / 200);
    lbC.style.display = "inline";
  } else {
    razmC.innerHTML = "0";
    !littleBlockC(blockHeight - line / 200, 0.6 - line / 200);
    lbC.style.display = "none";
  }

  littleBlockA(Number(60 + centVer), Number(60 + centHor));
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

  llLine = 60 + Number(line);

  shirLast = 60 + 0.5 + (Math.trunc(width / 0.6) - 1) * llLine;
  visotLast = 60 + 0.5 + (Math.trunc(height / 0.6) - 1) * llLine;
  kraiVert = (clientWidth - shirLast) / 2;
  kraiHor = (clientHeight - visotLast) / 2;

  // console.log(kraiVert + " kraiVert");
  // console.log(kraiHor + " kraiHor");
  // console.log(shirLast + " shirLast");
  // console.log(visotLast + " visotLast");

  for (i = 0; i < Math.trunc(width / 0.6) + 1; i++) {
    for (n = 0; n < Math.trunc(height / 0.6) + 1; n++) {
      ver = kraiHor + 0.75 + n * llLine; // шаг между вертикальными линиями
      hor = kraiVert + 0.75 + i * llLine; //шаг между горизонтальными линиями

      // console.log("hor" + hor);
      // console.log(clientWidth + "client width");

      ctx.fillRect(0, 0, clientWidth, clientHeight); //фон
      ctx.moveTo(hor, 0);
      ctx.lineTo(hor, clientHeight);
      ctx.moveTo(0, ver);
      ctx.lineTo(clientWidth, ver);
      ctx.stroke();
    }
  }
  //блок А если равен нулю то не показывать в таблице
  if ((kraiHor / 100).toFixed(2) > 0 && (kraiVert / 100).toFixed(2) > 0) {
    razmA.innerHTML =
      `${(kraiHor / 100).toFixed(2)}` +
      "m  x " +
      `${(kraiVert / 100).toFixed(2)}` +
      "m";
    lbA.style.display = "inline";
  } else {
    razmA.innerHTML = "0";
    lbA.style.display = "none";
  }
  //блок В если равен нулю то не показывать в таблице
  if ((kraiHor / 100).toFixed(2) > 0) {
    razmB.innerHTML = `${(kraiHor / 100).toFixed(2)}` + "m  x  0.6m";
    lbB.style.display = "inline";
  } else {
    razmB.innerHTML = "0";
    lbB.style.display = "none";
  }
  //блок С если равен нулю то не показывать в таблице
  if ((kraiVert / 100).toFixed(2) > 0) {
    razmC.innerHTML = "0.6m x " + `${(kraiVert / 100).toFixed(2)}` + "m";
    lbC.style.display = "inline";
  } else {
    razmC.innerHTML = "0";
    lbC.style.display = "none";
  }

  ctx.fillStyle = "red";
  ctx.font = "8pt Arial";

  ctx.fillText("a", kraiVert / 2 - 5, kraiHor);
  ctx.fillText("b", kraiVert + 25, kraiHor);
  ctx.fillText("c", kraiVert / 2 - 5, kraiHor + 60);
  littleBlockA(
    `${(kraiHor / 100).toFixed(2)}`,
    `${(kraiVert / 100).toFixed(2)}`,
    line
  );
  littleBlockB(`${(kraiHor / 100).toFixed(2)}`, 0.6, line);
  littleBlockC(0.6, `${(kraiVert / 100).toFixed(2)}`, line);
}

// test.addEventListener("click", () => {
//   littleBlockA();
// });
function littleBlockA(visota, shirina) {
  block = document.getElementById("blockA");
  block.classList = "testing";

  clientWidth = shirina;
  clientHeight = visota;
  block.width = clientWidth;
  block.height = clientHeight;
  centrWidth = clientWidth / 2;
  centrHeight = clientHeight / 2;
  let ctx = block.getContext("2d");
  ctx.lineWidth = 1;
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(0, 0, clientWidth, clientHeight);

  console.log(clientWidth + "clientWidth");
  console.log(clientHeight + "clientHeight");
  console.log(block.width);
  console.log(block.height);

  // ctx.fillStyle = "blue";
  // ctx.font = "bold 8px Arial";
  // ctx.fillText("A", centrWidth - 4, centrHeight);
}
function littleBlockB(visota, shirina) {
  block = document.getElementById("blockB");
  block.classList = "testing";

  clientWidth = shirina * 100;
  clientHeight = visota * 100;
  block.width = clientWidth;
  block.height = clientHeight;

  // console.log(block.width + "block width");
  // console.log(block.height + "block height");
  // console.log(clientWidth + "client width");
  // console.log(line);

  centrWidth = clientWidth / 2;
  centrHeight = clientHeight / 2;
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

  clientWidth = shirina * 100;
  clientHeight = visota * 100;
  block.width = clientWidth;
  block.height = clientHeight;
  centrWidth = clientWidth / 2;
  centrHeight = clientHeight / 2;

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
