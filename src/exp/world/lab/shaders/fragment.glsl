uniform sampler2D u_tex;
uniform sampler2D u_tex2;
uniform vec4 u_resolution;
uniform float u_opacity; 
uniform float u_time;
uniform float u_progress;
uniform float u_intensity;

varying vec2 v_uv;
varying float v_noise;

void main()	{
    vec2 new_uv = (v_uv - vec2(0.5))* u_resolution.zw + vec2(0.5);

    /* vec2 new_uv = v_uv; */
    vec4 d1 = texture2D(u_tex, new_uv);
    vec4 d2 = texture2D(u_tex2, new_uv);

    float dis_tex = (d1.r + d1.g + d1.b)*0.33;
    float dis_tex2 = (d2.r + d2.g + d2.b)*0.33;
    
    vec4 tex1 = texture2D(u_tex, vec2(new_uv.x, new_uv.y + u_progress * (dis_tex2 * u_intensity)));
    vec4 tex2 = texture2D(u_tex2, vec2(new_uv.x, new_uv.y + (1.0 - u_progress) * (dis_tex * u_intensity)));

    gl_FragColor = mix(tex1, tex2, u_progress);
    gl_FragColor.rgb += 0.05 * vec3(v_noise);
    gl_FragColor.a = u_opacity; 
}