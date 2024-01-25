import * as THREE from "three";
import { extend } from "@react-three/fiber";

export default class SlideMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        iTime: { value: 0.0 },
        iResolution: new THREE.Vector3(),
        angle: { value: 0.0 },
        x: { value: 0.0 },
        y: { value: 0.0 },
      },
      vertexShader: `
      varying vec2 vUv;
      uniform float iTime;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform float angle;
        uniform float x;
        uniform float y;

        vec3 rectColor = vec3(0.1, 0.50, 0.93);

        //rectangles
        const float total = 60.;//number of rectangles
        const float minSize = 0.03;//rectangle min size
        const float maxSize = 0.08-minSize;//rectangle max size
        const float yDistribution = 0.5;

        float random(vec2 co){
            return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
        }

        float rectangle(vec2 uv, vec2 pos, float width, float height, float blur) {
            
            pos = (vec2(width, height) + .01)/2. - abs(uv - pos);
            pos = smoothstep(0., blur , pos);
            return pos.x * pos.y; 
          
        }

        mat2 rotate2d(float _angle){
            return mat2(cos(_angle),-sin(_angle),
                        sin(_angle),cos(_angle));
        }

        void mainImage( out vec4 fragColor, in vec2 fragCoord )
        {
          vec2 uv = fragCoord.xy / iResolution.xy * 2. - 1.;
            uv.x *= iResolution.x/iResolution.y;
            uv = uv * rotate2d( angle );
            uv.x -= x;
            uv.y -= y;

            //bg
            vec3 color = vec3(0, 0, 0);
            
            //rectangles
            float velX = iTime/32.;
            float velY = iTime/10.;
            for(float i=0.; i<total; i++){
                float index = i/total;
                float rnd = random(vec2(index));
                vec3 pos = vec3(0, 0., 0.);
                pos.x = fract(velX*rnd+index)*10.-5.0;
                pos.y = sin(index*rnd*1000.+velY) * yDistribution;
                pos.z = maxSize*rnd+minSize;
                vec2 uvRot = uv - pos.xy + pos.z/2.;
                uvRot = rotate2d( i+iTime/2. ) * uvRot;
                uvRot += pos.xy+pos.z/2.;
                float rect = rectangle(uvRot, pos.xy, pos.z, pos.z, (maxSize+minSize-pos.z)/2.);
              color += rectColor * rect * pos.z/maxSize;
            }
            
          fragColor = vec4(color, 1.0);
        }
        void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
        }
      `,
    });
  }

  get angle() {
    return this.uniforms.angle.value;
  }

  set angle(v) {
    return (this.uniforms.angle.value = v);
  }

  get x() {
    return this.uniforms.x.value;
  }

  set x(v) {
    return (this.uniforms.x.value = v);
  }

  get y() {
    return this.uniforms.y.value;
  }

  set y(v) {
    return (this.uniforms.y.value = v);
  }

  get iTime() {
    return this.uniforms.iTime.value;
  }

  set iTime(v) {
    return (this.uniforms.iTime.value = v);
  }

  get iResolution() {
    return this.uniforms.iResolution.value;
  }

  set iResolution(v) {
    return (this.uniforms.iResolution.value = v);
  }
}

extend({ SlideMaterial });
