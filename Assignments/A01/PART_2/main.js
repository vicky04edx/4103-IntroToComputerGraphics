const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl2");

// Vertices 
// 3 separate triangles
const vertices = [
    // Triangle 1 (red) on left
    -0.8,  0.5, 0.0,
    -0.3,  0.5, 0.0,
    -0.55, 0.0, 0.0,

    // Triangle 2 (blue) on right
     0.3,  0.5, 0.0,
     0.8,  0.5, 0.0,
     0.55, 0.0, 0.0,

    // Triangle 3 (green) bottom-center
    -0.25, -0.5, 0.0,
     0.25, -0.5, 0.0,
     0.0,  0.0, 0.0
];

// Compile shaders 
function compileShader(src, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
}

const vertShader = compileShader(vertShaderSrc, gl.VERTEX_SHADER);
const fragShader = compileShader(fragShaderSrc, gl.FRAGMENT_SHADER);

// Shader program 
const program = gl.createProgram();
gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);
gl.useProgram(program);

// Setup buffer
const vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

const posLoc = gl.getAttribLocation(program, "aPosition");
gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posLoc);

// Draw triangles 
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

const colorLoc = gl.getUniformLocation(program, "uColor");

// Triangle 1: red
gl.uniform3fv(colorLoc, [1.0, 0.0, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3);

// Triangle 2: blue
gl.uniform3fv(colorLoc, [0.0, 0.0, 1.0]);
gl.drawArrays(gl.TRIANGLES, 3, 3);

// Triangle 3: green
gl.uniform3fv(colorLoc, [0.0, 1.0, 0.0]);
gl.drawArrays(gl.TRIANGLES, 6, 3);
