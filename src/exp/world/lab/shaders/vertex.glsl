uniform float u_time; 
uniform float u_wave; 

varying vec2 v_uv; 
varying float v_dist; 
varying float v_noise; 

void main()
{
    vec3 new_pos = position; 

    float dist = distance(uv, vec2(0.5));

    new_pos.z += u_wave * 20. *sin(dist*10. + u_time);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(new_pos, 1.0);

    v_uv = uv; 
    v_dist = dist; 
    v_noise = u_wave*sin(dist*10. + u_time);
}