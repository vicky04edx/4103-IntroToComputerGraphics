// var squareOfTriangles = [
//     -0.5,  0.5,  0.0, 
//      0.5,  0.5,  0.0, 
//      0.5, -0.5,  0.0, 

//     -0.5,  0.5,  0.0,
//      0.5, -0.5,  0.0,
//     -0.5, -0.5,  0.0 
// ];


// console.log(squareOfTriangles);
// var vertShaderSrcCode = 
// `#version 300 es

// in vec3 aPosition;
// in vec3 aColor;
// out vec3 vColor;

// void main() {

//     //code to move the color to fragment shader
//     vColor = aColor;
//     gl_Position = vec4(aPosition, 1.0);
// }
// `;


// var fragShaderSrcCode = 
// `#version 300 es
// in vec3 vColor;
// out vec4 fragColor;
// void main() {
//     fragColor = vec4(vColor, 1.0);
// }
// `;

// vertShdr = gl.createShader( gl.VERTEX_SHADER );
// gl.shaderSource( vertShdr, vertShaderSrcCode);
// gl.compileShader( vertShdr );
// console.log(gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS));
// console.log(gl.getShaderInfoLog( vertShdr ));

// fragShdr = gl.createShader( gl.FRAGMENT_SHADER );
// gl.shaderSource( fragShdr, fragShaderSrcCode);
// gl.compileShader( fragShdr );
// console.log(gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS));
// console.log(gl.getShaderInfoLog( fragShdr ));

// var program = gl.createProgram();
// gl.attachShader( program, vertShdr );
// gl.attachShader( program, fragShdr );
// gl.linkProgram( program );
// console.log(gl.getProgramInfoLog( program ));
// gl.useProgram(program)



// // creating buffer for the square

// var vBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareOfTriangles), gl.STATIC_DRAW);

// // associating the data to vertix shader; aPosition attribute

// var positionLoc = gl.getAttribLocation( program, "aPosition");
// gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(positionLoc);

// // Color buffer
// var colors = [
//     // First triangle (red)
//     1.0, 0.0, 0.0, 
//     1.0, 0.0, 0.0, 
//     1.0, 0.0, 0.0,

//     // Second triangle (blue)
//     0.0, 0.0, 1.0,
//     0.0, 0.0, 1.0,
//     0.0, 0.0, 1.0
// ];

// var cBuffer = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

// var colorLoc = gl.getAttribLocation(program, "aColor");
// gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(colorLoc);

// // draw
// gl.clearColor(1.0, 1.0, 1.0, 1.0);
// gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
// gl.enable(gl.DEPTH_TEST);

// gl.drawArrays(gl.TRIANGLES, 0, 6);


// positions of two triangles forming a square
var squareOfTriangles = [
    -0.5,  0.5, 0.0, 
     0.5,  0.5, 0.0, 
     0.5, -0.5, 0.0, 

    -0.5,  0.5, 0.0,
     0.5, -0.5, 0.0,
    -0.5, -0.5, 0.0 
];

// Colors: first triangle red, second triangle blue
var colors = [
    1.0, 0.0, 0.0,  
    1.0, 0.0, 0.0,  
    1.0, 0.0, 0.0, 

    0.0, 0.0, 1.0,  
    0.0, 0.0, 1.0, 
    0.0, 0.0, 1.0  
];

// Vertex shader
var vertShaderSrcCode = `#version 300 es
in vec3 aPosition;
in vec3 aColor;
out vec3 vColor;

void main() {
    vColor = aColor;
    gl_Position = vec4(aPosition, 1.0);
}
`;

// Fragment shader
var fragShaderSrcCode = `#version 300 es
precision mediump float;
in vec3 vColor;
out vec4 fragColor;

void main() {
    fragColor = vec4(vColor, 1.0);
}
`;

// compile vertex shader 
var vertShdr = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShdr, vertShaderSrcCode);
gl.compileShader(vertShdr);
console.log(gl.getShaderParameter(vertShdr, gl.COMPILE_STATUS));
console.log(gl.getShaderInfoLog(vertShdr));

// compile fragment shader
var fragShdr = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShdr, fragShaderSrcCode);
gl.compileShader(fragShdr);
console.log(gl.getShaderParameter(fragShdr, gl.COMPILE_STATUS));
console.log(gl.getShaderInfoLog(fragShdr));

// create and link program 
var program = gl.createProgram();
gl.attachShader(program, vertShdr);
gl.attachShader(program, fragShdr);
gl.linkProgram(program);
console.log(gl.getProgramInfoLog(program));
gl.useProgram(program);

// position buffer 
var vBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareOfTriangles), gl.STATIC_DRAW);

var positionLoc = gl.getAttribLocation(program, "aPosition");
gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(positionLoc);

// color buffer 
var cBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

var colorLoc = gl.getAttribLocation(program, "aColor");
gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(colorLoc);

// draw 
gl.clearColor(1.0, 1.0, 1.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);

gl.drawArrays(gl.TRIANGLES, 0, 6);
console.log("Draw attempted");

