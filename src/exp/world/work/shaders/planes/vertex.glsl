uniform float u_time; 
uniform float u_scroll; 

varying vec2 v_uv; 

void main()
{
    vec3 new_pos = position; 
;
    float dist = distance(uv, vec2(0.5));

    new_pos.y += u_scroll * sin(dist * 10. + u_time);
    new_pos.z += 15. * cos(dist * 10. + u_time);

    vec4 modelPosition = modelMatrix * vec4(new_pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition; 
    vec4 projectedPosition = projectionMatrix * viewPosition; 

    gl_Position = projectedPosition; 

    v_uv = uv; 
}