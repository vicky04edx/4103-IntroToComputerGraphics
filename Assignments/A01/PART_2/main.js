/*****************************************************************************
*                    
*  Code by:          Victoria Heredia, Mahmoud Eldefrawy (code showed in class), 
*                    TutorialsPoint (WebGL - Drawing a Triangle), ChatGPT, Claude
*  Email:            vdheredia1128@my.msutexas.edu
*  Label:            A01
*  Title:            Part 2 - Draw more triangles
*  Course:           CMPS 4213 
*  Semester:         Fall 2025
*  Description:
*        This program displays three triangles with different solid colors. 
*        The vertices were planned out by hand on a coordinate sketch and then 
*        hardcoded into arrays. Uniform variables are used to set the colors 
*        for each triangle before drawing.
*
*  Disclaimer:     
*        This program was created by modifying code shown in class and examples 
*        from TutorialsPoint. I designed and hardcoded the triangle positions 
*        and colors myself, but I used ChatGPT and Claude for guidance in some 
*        parts (such as buffer usage, loop structure, and shader setup) and to 
*        check for errors. 
*****************************************************************************/
canvas = document.getElementById("glCanvas");
gl = canvas.getContext("webgl2");

// Vertices 
// 3 separate triangles
vertices = [
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

vertShader = compileShader(vertShaderSrc, gl.VERTEX_SHADER);
fragShader = compileShader(fragShaderSrc, gl.FRAGMENT_SHADER);

// Shader program 
program = gl.createProgram();
gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);
gl.useProgram(program);

// Setup buffer
vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

posLoc = gl.getAttribLocation(program, "aPosition");
gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(posLoc);

// Draw triangles 
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

colorLoc = gl.getUniformLocation(program, "uColor");

// Triangle 1: red
gl.uniform3fv(colorLoc, [1.0, 0.0, 0.0]);
gl.drawArrays(gl.TRIANGLES, 0, 3);

// Triangle 2: blue
gl.uniform3fv(colorLoc, [0.0, 0.0, 1.0]);
gl.drawArrays(gl.TRIANGLES, 3, 3);

// Triangle 3: green
gl.uniform3fv(colorLoc, [0.0, 1.0, 0.0]);
gl.drawArrays(gl.TRIANGLES, 6, 3);
