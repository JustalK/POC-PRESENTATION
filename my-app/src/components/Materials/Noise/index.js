import * as THREE from "three";
import { extend } from "@react-three/fiber";

export default class NoiseMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        iTime: { value: 0.0 },
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float iTime;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: `
      varying vec2 vUv;
      uniform float iTime;
      void main()  {
          vec2 newUV = vUv;
          vec4 c = vec4(0.25, 0.25, 0.25, 1.0);

          float noiseAmount = 0.2;
          float n = fract(sin(dot(vUv, vec2(iTime+12.9898, 78.233))) * 43758.5453);
          c *= (1.0 - noiseAmount + n * noiseAmount);
          gl_FragColor = c;
      }`,
    });
  }

  get iTime() {
    return this.uniforms.iTime.value;
  }

  set iTime(v) {
    return (this.uniforms.iTime.value = v);
  }
}

extend({ NoiseMaterial });
