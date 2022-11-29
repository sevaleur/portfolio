uniform sampler2D u_displacement;
uniform sampler2D u_tex; 
uniform float u_time; 
uniform float u_state; 
uniform float u_intensity;

varying vec2 v_uv;

void main()	
{
    //vec2 newUV = (v_uv - vec2(0.5))*resolution.zw + vec2(0.5);

    float w = 0.2; 
    float border = smoothstep(0., w, v_uv.x);
    float border1 = smoothstep(0., w, v_uv.y);
    float border2 = smoothstep(0., w, 1.0 - v_uv.y);
    float border3 = smoothstep(0., w, 1.0 - v_uv.x);

    border *= border1*border2*border3;

    vec3 color = vec3(0.808, 0.82, 0.827); 

    vec2 new_uv = v_uv;
    vec4 disp = texture2D(u_displacement, new_uv);

    vec2 dispVec = vec2(disp.r, disp.g) - new_uv;

    vec2 dist_pos1 = new_uv + .5 * dispVec * u_intensity + u_state;
    vec4 t1 = vec4(color, dist_pos1 + 1.0);
    vec4 t1_f = mix(t1, disp, border);

    vec2 dist_pos2 = new_uv + .75 * dispVec * u_intensity * (1. - u_state);
    vec4 t2 = texture2D(u_tex, dist_pos2);
    vec4 t2_f = mix(vec4(color, 1.0), t2, border);
    
    gl_FragColor = mix(t1_f, t2_f, u_state);
}