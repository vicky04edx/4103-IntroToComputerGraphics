// Vertex shader
var vertShaderSrc = `
    attribute vec3 aPosition;
    void main() {
        gl_Position = vec4(aPosition, 1.0);
    }
`;

// Fragment shader with uniform color
var fragShaderSrc = `
    precision mediump float;
    uniform vec3 uColor;
    void main() {
        gl_FragColor = vec4(uColor, 1.0);
    }
`;
