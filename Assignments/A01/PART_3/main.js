const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl2");

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

// Setup triangle buffer
const vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Setup line buffer
const lineBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);

const posLoc = gl.getAttribLocation(program, "aPosition");
const colorLoc = gl.getUniformLocation(program, "uColor");

// Clear canvas
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// Draw all triangles using a simple for loop
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posLoc);

// Calculate how many triangles we have
const numTriangles = vertices.length / 9; // 9 floats per triangle (3 vertices × 3 coordinates)

// Simple for loop to draw all triangles
for (let i = 0; i < numTriangles; i++) {
    gl.uniform3fv(colorLoc, triangleColors[i]);
    gl.drawArrays(gl.TRIANGLES, i * 3, 3);
}

// Draw outlines using the line buffer
gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posLoc);

// Set line properties
gl.lineWidth(2.0);
gl.uniform3fv(colorLoc, [0.0, 0.0, 0.0]); // Black outlines

// Draw all the outline lines
gl.drawArrays(gl.LINES, 0, lineVertices.length / 3);