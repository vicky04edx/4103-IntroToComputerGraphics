// Victoria Heredia
// Fall 2025
// CMPS 4213 - Dr. Mahmoud Eldefrawy 
//
// Description: 
//   This file contains the main WebGL logic for Part 3 of the assignment. 
//   It compiles and links the shaders, sets up the triangle and line buffers, 
//   and draws all the shapes with their assigned colors and outlines. 
//
// Disclaimer: 
//   This program is based on code we wrote in class. 
//   All vertices, line coordinates, and colors were typed in manually by me 
//   based on my sketches. The loop for drawing the triangles and the buffer 
//   setup were written by me, but I needed help from ChatGPT to 
//   understand the math behind indexing (i * 3) and to check for errors in 
//   my buffer setup. I typed in everything myself and only used these tools 
//   to debug and confirm the logic.

canvas = document.getElementById("glCanvas");
gl = canvas.getContext("webgl2");

// Compile shaders 
function compileShader(src, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    return shader;
}

vertShader = compileShader(vertShaderSrc, gl.VERTEX_SHADER);
fragShader = compileShader(fragShaderSrc, gl.FRAGMENT_SHADER);

// Shader program 
program = gl.createProgram();
gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);
gl.useProgram(program);

// Setup triangle buffer
vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// Setup line buffer
lineBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);

posLoc = gl.getAttribLocation(program, "aPosition");
colorLoc = gl.getUniformLocation(program, "uColor");

// Clear canvas
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// Draw all triangles using a simple for loop
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posLoc);

// Calculate how many triangles we have
numTriangles = vertices.length / 9; // 9 floats per triangle (3 vertices × 3 coordinates)

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