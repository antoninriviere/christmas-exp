uniform float uTime;
uniform float uSpeed;
uniform float uWind;
attribute vec3 aInitialPosition;
attribute float aSpeed;
attribute float aSeed;

varying float vOpacity;

void main() {
  float heightRange = 10.0;  

  float posY = mod(aInitialPosition.y - uTime * aSpeed * uSpeed, heightRange) - (heightRange * 0.1);

  vec3 pos = vec3(aInitialPosition.x, posY, aInitialPosition.z);

  // wind / oscillation
  // aSeed to give unique pattern
  float windStrength = 0.5 * uWind;
  pos.x += sin(aSeed * 10.0 + uTime * 0.5) * windStrength;
  pos.z += cos(aSeed * 10.0 + uTime * 0.5) * windStrength;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float dist = length(mvPosition.xyz);

  // decrease size with distance
  gl_PointSize = 60.0 / (dist * 0.2 + 1.0);

  // decrease opacity with distance
  vOpacity = clamp(1.0 - dist / 30.0, 0.0, 1.0);

  gl_Position = projectionMatrix * mvPosition;
}
