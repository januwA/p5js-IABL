let img;
let gfile;
let ctx;
let upimage;
let imgSrcInput;
let LoadingImgButton;
let downloadButton;

function setup() {
  ctx = img ? createCanvas(img.width, img.height) : createCanvas(600, 400);
  ctx.drop(gotFile); // 获取拖拽上传的图片
  handleFileInput(); // 获取input上传的图片
  gotLoadingImg(); // 获取input中输入的图片

  createButton("Download").mousePressed(e => {
    if (!img) return null;
    saveCanvas(ctx, gfile.name);
    // if (gfile.data.startsWith("http")) {
    //   return alert("网络图片请手动下载!");
    // }
    // const dataURL = ctx.canvas.toDataURL(gfile.file.type);
    // downloadButton.attribute("download", gfile.name);
    // downloadButton.attribute("href", dataURL);
    // setTimeout(() => {
    //   downloadButton.attribute("href", "javascript: (void 0)");
    // }, 1000);
  });
}

function gotFile(file) {
  setImg(file);
}

function draw() {
  if (img) {
    image(img, 0, 0, width, height);
    for (let y = 0; y < height; y++) {
      if (y % 2 === 0) {
        stroke(0, 200);
        const h = y * 2;
        line(0, h, width, h);
      }
    }
  } else {
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(28);
    text("拖入图片。", width / 2, height / 2);
  }
}

function handleFileInput() {
  upimage = createFileInput(file => {
    setImg(file);
  });
  upimage.attribute("accept", "image/*");
  const p = createP("");
  upimage.parent(p);
}

function setImg(f) {
  gfile = f;
  img = createImg(f.data, () => {
    resizeCanvas(Math.max(img.width, 600), Math.max(img.height, 400));
  });
  img.hide();
}

function gotLoadingImg() {
  imgSrcInput = select("#imgSrcInput");
  LoadingImgButton = select("#loadimg");
  LoadingImgButton.mouseClicked(() => {
    const src = imgSrcInput.value().trim();
    if (!src) return null;
    let r = /(?<filename>\w+\.(?<filetype>\w+))$/i.exec(src);
    if (!r) return null;
    setImg({
      data: src,
      name: r.groups.filename,
      file: {
        type: `image/${
          /jpg/i.test(r.groups.filetype) ? "jpeg" : r.groups.filetype
          }`,
      },
    });
  });
}