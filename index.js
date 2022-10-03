//валидация инпутов только на цифры и замена запятой на точку
width.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

height.addEventListener("keyup", function () {
  this.value = this.value.replace(/[^\d.,-]/g, "").replace(/[,-]/g, ".");
});

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

    canvasDraw(width.value, height.value);
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

    canvasDrawCentred(width.value, height.value);
  }
});

razmA;
razmB;
razmC;
// минимум нарезки
function canvasDraw(width, height) {
  canvas = document.getElementById("canvas");
  canvas.classList = "canv";
  clientWidth = width * 100;
  clientHeight = height * 100;
  canvas.width = clientWidth;
  canvas.height = clientHeight;

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f8f8f8";
  ctx.strokeStyle = "black";

  for (i = 0; i < Math.trunc(width / 0.6); i++) {
    for (n = 0; n < Math.trunc(height / 0.6); n++) {
      ver = 60 + 0.5 + n * 60; // шаг между вертикальными линиями
      hor = 60 + 0.5 + i * 60; //шаг между горизонтальными линиями
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

  //отрисовка А если обе стороны больше 0
  if (
    ((clientHeight - ver) / 100).toFixed(2) > 0 &&
    ((clientWidth - hor) / 100).toFixed(2) > 0
  ) {
    ctx.fillText("a", hor + centHor, clientHeight - 1);
    razmA.innerHTML =
      `${((clientHeight - ver) / 100).toFixed(2)}` +
      "m x " +
      `${((clientWidth - hor) / 100).toFixed(2)}` +
      "m";
  } else {
    razmA.innerHTML = "0";
  }

  //отрисовка В если его ширина больше 0
  if (((clientWidth - hor) / 100).toFixed(2) > 0) {
    ctx.fillText("b", hor + centHor, ver - 1);
    razmB.innerHTML =
      "0.6m x " + `${((clientWidth - hor) / 100).toFixed(2)}` + "m";
  } else {
    razmB.innerHTML = "0";
  }

  //отрисовка С если его высота больше 0
  if (((clientHeight - ver) / 100).toFixed(2) > 0) {
    ctx.fillText("c", hor - centHor, clientHeight - 1);
    razmC.innerHTML = `${((clientHeight - ver) / 100).toFixed(2)}` + "m x 0.6m";
  } else {
    razmC.innerHTML = "0";
  }
}
//выравненные

function canvasDrawCentred(width, height) {
  canvas = document.getElementById("canvas");
  canvas.classList = "canv";
  clientWidth = width * 100;
  clientHeight = height * 100;
  canvas.width = clientWidth;
  canvas.height = clientHeight;

  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "#f8f8f8";
  ctx.strokeStyle = "black";

  shirLast = 60 + 0.5 + (Math.trunc(width / 0.6) - 1) * 60;
  visotLast = 60 + 0.5 + (Math.trunc(height / 0.6) - 1) * 60;
  kraiVert = (clientWidth - shirLast) / 2;
  kraiHor = (clientHeight - visotLast) / 2;

  for (i = 0; i < Math.trunc(width / 0.6) + 1; i++) {
    for (n = 0; n < Math.trunc(height / 0.6) + 1; n++) {
      ver = kraiHor + 0.75 + n * 60; // шаг между вертикальными линиями
      hor = kraiVert + 0.75 + i * 60; //шаг между горизонтальными линиями

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
  } else {
    razmA.innerHTML = "0";
  }
  //блок В если равен нулю то не показывать в таблице
  if ((kraiHor / 100).toFixed(2) > 0) {
    razmB.innerHTML = `${(kraiHor / 100).toFixed(2)}` + "m  x  0.6m";
  } else {
    razmB.innerHTML = "0";
  }
  //блок С если равен нулю то не показывать в таблице
  if ((kraiVert / 100).toFixed(2) > 0) {
    razmC.innerHTML = "0.6m x " + `${(kraiVert / 100).toFixed(2)}` + "m";
  } else {
    razmC.innerHTML = "0";
  }

  ctx.fillStyle = "red";
  ctx.font = "8pt Arial";

  ctx.fillText("a", kraiVert / 2 - 5, kraiHor);
  ctx.fillText("b", kraiVert + 25, kraiHor);
  ctx.fillText("c", kraiVert / 2 - 5, kraiHor + 60);
  littleBlockA(
    `${(kraiHor / 100).toFixed(2)}`,
    `${(kraiVert / 100).toFixed(2)}`
  );
  littleBlockB(`${(kraiHor / 100).toFixed(2)}`, 0.6);
  littleBlockC(0.6, `${(kraiVert / 100).toFixed(2)}`);
}

test.addEventListener("click", () => {
  littleBlockA();
});
function littleBlockA(visota, shirina) {
  block = document.getElementById("blockA");
  block.classList = "testing";
  clientWidth = shirina * 100;
  clientHeight = visota * 100;
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
  clientWidth = shirina * 100;
  clientHeight = visota * 100;
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
  clientWidth = shirina * 100;
  clientHeight = visota * 100;
  block.width = clientWidth;
  block.height = clientHeight;
  let ctx = block.getContext("2d");
  ctx.lineWidth = 1;
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(0, 0, clientWidth, clientHeight);
}
