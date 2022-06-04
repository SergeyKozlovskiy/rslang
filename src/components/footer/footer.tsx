import React from 'react';
import { Text } from '../../types/enums';
import { Classes } from '../../types/enums';
import logoSchool from '../../assets/footer/rs.svg';
import './footer.sass';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <a className="footer__logo" href="https://rs.school/" rel="noreferrer" target="_blank">
        <svg
          className="footer__logo-svg"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="780.000000pt"
          height="409.000000pt"
          viewBox="0 0 780.000000 409.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            className="logo-fill"
            transform="translate(0.000000,409.000000) scale(0.100000,-0.100000)"
            stroke="none"
          >
            <path
              d="M2269 4075 c-323 -64 -577 -240 -694 -478 -51 -105 -68 -183 -67
-317 0 -146 20 -240 77 -356 50 -103 111 -177 187 -225 l52 -34 -41 -7 c-23
-4 -79 -19 -125 -33 -95 -30 -178 -36 -225 -16 -39 16 -63 61 -99 187 -32 109
-78 198 -119 230 -17 13 -57 35 -89 50 -81 37 -158 31 -281 -21 -82 -34 -102
-38 -220 -46 -260 -17 -409 -82 -508 -221 -56 -79 -86 -160 -93 -252 -19 -219
101 -444 278 -521 l66 -28 4 -107 c4 -93 8 -113 30 -151 33 -55 66 -86 150
-142 l67 -44 93 19 c76 16 151 21 412 25 l319 5 69 38 68 37 75 -22 c42 -12
79 -26 83 -31 5 -5 14 -34 21 -64 8 -30 26 -88 42 -129 l28 -75 -39 -42 c-76
-83 -131 -187 -166 -314 -24 -87 -24 -261 -1 -350 63 -240 260 -443 517 -532
210 -73 460 -73 672 0 113 40 160 64 246 129 85 65 154 144 223 258 l51 83 46
-15 c26 -8 95 -17 153 -20 156 -8 287 25 393 100 26 19 33 19 75 8 142 -40
211 -50 326 -50 111 0 157 5 226 23 24 7 26 4 44 -55 11 -34 35 -87 55 -118
100 -154 246 -214 391 -161 131 47 260 148 364 283 43 56 58 68 110 87 68 25
137 65 211 121 l51 39 59 -35 c93 -56 172 -77 306 -83 133 -5 234 11 352 57
l73 28 66 -43 c65 -43 67 -43 124 -34 32 5 92 11 133 15 183 16 341 56 433
109 67 40 163 146 197 218 52 112 56 211 17 403 -8 39 -18 122 -22 185 -7 133
-18 188 -47 248 l-20 43 23 16 c13 9 65 57 115 108 137 138 181 246 172 420
-5 104 -41 182 -131 286 l-66 77 16 48 c19 61 19 237 0 314 -13 54 -13 57 15
113 70 141 37 312 -85 445 -165 178 -469 174 -649 -10 -46 -47 -108 -155 -108
-188 0 -12 -34 -33 -110 -69 l-110 -52 -58 34 c-73 45 -118 63 -213 87 -140
36 -376 23 -546 -29 l-61 -19 -17 62 c-45 161 -113 254 -230 314 -68 36 -73
37 -180 37 -104 -1 -115 -3 -198 -38 -48 -20 -98 -37 -111 -37 -13 0 -54 9
-92 21 -51 16 -87 20 -149 17 -79 -3 -85 -5 -169 -56 l-88 -54 -91 43 c-83 38
-100 43 -168 43 -73 1 -82 -2 -175 -49 -171 -86 -306 -247 -322 -380 -2 -25
-7 -47 -11 -49 -3 -2 -62 -1 -130 3 l-124 6 -32 95 c-68 203 -131 302 -248
396 -84 66 -156 104 -277 144 -166 56 -417 76 -571 45z m416 -240 c263 -50
421 -180 470 -387 53 -226 -50 -424 -260 -499 -46 -17 -65 -29 -65 -41 0 -26
83 -211 136 -303 58 -99 160 -231 216 -280 115 -98 238 -155 337 -155 66 0 88
6 228 67 231 99 316 75 330 -94 l6 -69 -60 -59 c-121 -122 -257 -175 -447
-175 -215 0 -366 68 -547 245 -162 160 -292 398 -401 734 -18 57 -39 106 -46
109 -7 2 -24 0 -37 -6 -21 -10 -23 -15 -18 -79 8 -124 8 -126 57 -146 80 -33
80 -33 61 -112 -17 -75 -41 -118 -113 -203 -49 -57 -208 -182 -232 -182 -21 0
-110 91 -110 112 0 10 21 60 46 111 57 113 59 126 46 472 -10 287 -12 293 -82
396 -22 32 -40 62 -40 67 0 19 61 64 105 78 28 8 90 14 146 14 l98 0 17 -32
c14 -28 15 -42 5 -112 -6 -45 -11 -107 -11 -138 l0 -58 78 0 c142 0 227 42
273 136 17 37 21 57 16 103 -2 32 -12 72 -21 90 -22 41 -86 105 -126 126 -83
43 -285 58 -394 30 -132 -35 -239 -113 -286 -209 -21 -45 -21 -45 -2 -88 10
-24 41 -79 68 -123 61 -98 84 -154 84 -204 0 -37 -2 -39 -51 -60 -71 -29 -115
-27 -170 7 -61 39 -107 94 -143 172 -26 56 -30 79 -34 172 -3 89 -1 119 17
176 40 131 138 246 268 314 158 83 406 118 588 83z m2698 -189 c46 -97 43
-199 -7 -261 -21 -26 -30 -30 -93 -33 -85 -5 -121 11 -160 69 -46 70 -28 175
43 246 22 22 30 24 111 21 l88 -3 18 -39z m-579 -18 c44 -117 62 -282 75 -683
9 -260 18 -305 76 -381 26 -34 27 -34 103 -33 l77 0 38 45 37 45 -1 152 c-2
211 -1 207 -74 224 -33 7 -63 17 -67 21 -14 14 40 111 86 154 50 48 161 118
187 118 31 0 57 -134 74 -378 8 -121 19 -231 24 -244 5 -13 37 -50 70 -83 60
-58 67 -75 55 -121 -5 -18 -18 -23 -88 -33 -45 -6 -132 -14 -193 -18 l-111 -6
-60 46 -60 47 -26 -34 c-14 -19 -52 -47 -83 -62 -49 -25 -69 -28 -143 -28 -80
1 -210 19 -237 33 -10 5 0 32 34 100 59 116 60 131 39 481 -20 334 -23 349
-51 360 -34 13 -63 57 -71 106 -6 43 -4 47 27 75 78 67 194 135 236 138 6 1
18 -18 27 -41z m2536 -12 c50 -33 72 -75 68 -129 -2 -34 -9 -45 -38 -65 -33
-22 -41 -24 -123 -18 -105 8 -105 13 8 -114 83 -94 115 -150 122 -215 7 -60
-13 -111 -64 -166 -51 -55 -98 -77 -260 -123 -111 -31 -119 -35 -135 -67 l-16
-34 31 -14 c38 -17 157 -17 266 0 121 18 229 -8 282 -69 47 -53 80 -133 70
-169 -43 -150 -202 -280 -391 -319 -83 -18 -248 -15 -336 5 -84 19 -155 68
-183 124 -22 44 -23 52 -11 90 15 50 60 94 106 103 39 7 30 12 194 -114 45
-34 94 -65 108 -69 41 -10 186 42 216 78 49 58 25 126 -52 148 -18 5 -132 7
-254 4 l-223 -6 -42 46 c-39 42 -43 52 -43 96 0 49 2 51 65 108 36 32 65 61
65 65 0 4 -26 34 -58 66 -92 94 -105 181 -47 311 28 62 31 65 100 97 68 31
252 84 294 84 26 0 26 -3 0 81 -17 57 -19 75 -10 97 16 37 68 91 105 108 47
22 138 12 186 -20z m-3081 -38 c46 -142 71 -347 71 -608 0 -131 16 -318 30
-354 5 -14 34 -51 65 -83 51 -53 56 -61 53 -98 -3 -37 -6 -40 -53 -58 -56 -21
-268 -35 -348 -23 l-47 7 0 54 c0 30 4 56 9 59 5 3 23 31 41 62 l31 56 -15
246 c-9 136 -18 296 -19 356 l-4 110 -54 36 c-68 45 -75 75 -30 137 33 46 69
75 155 127 83 50 90 48 115 -26z m1695 -352 l34 -58 7 31 c7 33 32 54 113 95
97 49 187 47 248 -6 65 -57 84 -121 100 -329 6 -77 6 -78 91 -218 13 -20 23
-45 23 -57 0 -26 -116 -164 -172 -204 -49 -36 -110 -54 -156 -46 -19 3 -36 7
-38 9 -2 2 3 46 12 98 24 146 32 276 23 357 -9 76 -34 168 -49 177 -11 7 -173
-36 -182 -49 -15 -23 -40 -190 -35 -236 8 -68 26 -102 102 -195 36 -44 64 -84
62 -90 -2 -5 -34 -21 -73 -34 -60 -21 -88 -24 -218 -25 l-149 -1 -31 38 -31
38 59 57 c80 77 100 127 86 220 -6 37 -14 96 -18 132 l-7 65 -59 9 -58 9 6 45
c7 52 23 112 33 128 5 7 53 42 108 78 l100 66 18 -22 c9 -13 33 -49 51 -82z
m-2273 -95 c67 -25 139 -86 174 -146 43 -72 68 -195 62 -300 -7 -129 -34 -193
-117 -276 -87 -87 -136 -103 -293 -97 -133 5 -183 24 -251 91 -194 194 -157
569 69 702 100 58 243 69 356 26z m-2563 -344 c-6 -70 -28 -121 -58 -137 -11
-6 -59 -14 -106 -17 l-86 -6 7 -210 c4 -116 11 -224 16 -240 4 -16 24 -48 43
-72 l36 -43 -44 -59 c-58 -77 -113 -129 -158 -148 -36 -15 -98 -21 -98 -9 0 3
12 56 27 117 34 146 36 252 5 321 l-22 49 -23 -21 c-27 -26 -88 -52 -120 -52
-51 0 -117 32 -156 76 -47 54 -66 115 -58 194 9 101 57 163 165 212 43 20 62
22 225 20 l178 -2 37 30 c57 45 93 60 146 60 l49 0 -5 -63z m25 -170 c31 -14
34 -19 40 -68 4 -30 7 -76 7 -104 0 -27 3 -60 6 -71 l6 -21 49 18 c27 11 69
19 94 19 53 0 125 -26 125 -46 0 -7 5 -60 11 -116 9 -92 14 -108 46 -155 40
-60 41 -56 -39 -142 -60 -65 -73 -69 -139 -51 l-37 10 20 63 c26 83 25 192 -1
252 -22 49 -25 50 -102 9 l-32 -16 6 -85 c6 -78 10 -91 47 -147 22 -34 40 -65
40 -68 0 -3 -31 -9 -70 -12 -38 -3 -101 -9 -139 -12 l-68 -6 -6 32 c-5 25 0
41 29 85 l36 54 -11 82 c-6 45 -11 130 -11 188 l-1 106 -32 20 c-17 11 -33 28
-35 38 -2 10 13 52 35 93 42 83 45 84 126 51z m772 -218 c106 -30 172 -183
105 -244 -26 -24 -121 -45 -202 -45 l-66 0 11 -35 c13 -43 19 -43 152 -10 55
14 106 25 113 25 20 0 14 -64 -11 -101 -31 -48 -98 -79 -168 -79 -136 0 -207
61 -240 208 -18 84 48 248 114 280 29 14 142 15 192 1z m873 -336 c35 -22 108
-127 132 -191 13 -34 23 -83 23 -122 l2 -64 -53 -32 -54 -33 -78 62 c-85 67
-169 121 -218 139 -26 10 -42 8 -105 -11 l-74 -24 -17 -52 c-20 -66 -20 -88 2
-107 31 -28 162 -88 280 -130 152 -52 293 -119 358 -168 43 -32 61 -56 93
-122 59 -119 75 -191 75 -333 1 -120 1 -122 -36 -195 -66 -133 -173 -230 -316
-289 -100 -41 -171 -54 -297 -55 -176 0 -309 46 -434 152 -115 98 -166 221
-159 384 3 78 9 104 35 160 54 115 153 191 285 218 95 19 214 -15 271 -78 17
-19 17 -22 -9 -86 l-28 -67 -70 -20 c-164 -47 -196 -76 -196 -172 1 -144 83
-224 259 -249 126 -19 255 16 335 90 37 35 83 131 91 192 14 101 -33 229 -108
297 -39 35 -169 101 -237 121 -141 40 -362 146 -412 196 -81 81 -104 230 -51
337 38 77 127 162 199 188 89 34 152 44 228 38 59 -5 79 -2 130 17 34 13 68
26 76 29 19 7 48 -1 78 -20z m4467 -245 c30 -62 57 -127 61 -144 5 -28 2 -32
-29 -47 -65 -31 -114 -20 -237 53 -51 30 -72 37 -97 33 -32 -5 -33 -7 -33 -53
l0 -48 78 -27 c223 -77 305 -124 337 -191 20 -43 17 -126 -9 -211 -14 -43 -24
-56 -64 -81 -67 -43 -142 -62 -241 -62 -72 0 -94 -4 -135 -25 -71 -36 -92 -33
-144 21 -55 58 -101 155 -109 227 -5 50 -3 56 17 67 48 26 130 7 239 -55 105
-59 168 -77 188 -54 6 8 13 38 15 67 l3 54 -150 52 c-205 72 -246 94 -280 152
-24 41 -27 53 -21 102 8 63 37 136 69 170 42 45 76 55 203 63 93 5 131 11 160
26 22 11 58 21 81 22 l43 1 55 -112z m-904 2 c64 -23 130 -76 164 -130 54 -86
68 -209 30 -267 -39 -58 -167 -93 -347 -93 -138 0 -134 2 -122 -57 4 -22 16
-35 42 -47 59 -28 132 -22 262 24 143 50 165 51 174 9 22 -110 -4 -165 -101
-216 -98 -52 -188 -76 -249 -69 -121 14 -254 92 -311 182 -64 100 -90 273 -59
390 29 108 107 213 191 257 95 49 223 56 326 17z m-804 -76 c108 -76 170 -197
180 -351 13 -194 -73 -380 -204 -444 -92 -44 -230 -23 -293 45 -20 22 -25 38
-25 78 0 42 4 53 28 74 24 21 38 24 103 24 69 0 77 2 101 28 63 66 86 191 50
274 -35 81 -145 112 -237 66 -80 -41 -85 -60 -84 -305 2 -208 2 -213 27 -255
14 -24 37 -54 52 -68 65 -60 52 -103 -67 -224 -89 -91 -148 -125 -210 -126
-35 0 -38 3 -49 41 -11 34 -10 59 6 154 14 90 17 140 11 251 -3 77 -9 206 -13
287 l-6 148 -57 29 c-53 27 -58 32 -64 70 -8 51 10 79 92 146 111 91 174 105
223 49 l30 -34 59 30 c101 51 130 59 212 56 72 -2 80 -5 135 -43z m-1023 -35
c54 -18 140 -100 171 -162 36 -75 57 -187 53 -287 -3 -73 -8 -95 -39 -160 -47
-98 -75 -130 -151 -171 -62 -33 -66 -33 -205 -37 -138 -4 -144 -3 -185 21
-172 101 -257 370 -179 566 29 72 92 160 137 190 71 49 129 62 249 57 61 -2
128 -10 149 -17z m-829 -14 c90 -30 157 -67 178 -98 37 -56 29 -133 -18 -177
l-24 -22 -93 37 c-68 27 -113 39 -168 42 -86 6 -89 5 -115 -72 -40 -119 -29
-221 33 -287 32 -34 44 -40 92 -44 45 -5 73 0 150 26 52 17 116 34 141 37 45
5 46 5 53 -27 9 -50 7 -116 -5 -144 -18 -39 -119 -104 -191 -122 -95 -25 -231
-15 -298 22 -200 109 -279 398 -169 620 54 106 140 170 289 213 36 10 66 19
66 20 1 0 36 -10 79 -24z"
            />
            <path
              d="M6949 3161 c-65 -20 -100 -62 -101 -123 -1 -34 15 -52 89 -95 l42
-24 100 47 100 46 -16 42 c-20 51 -42 87 -62 104 -16 13 -110 15 -152 3z"
            />
            <path
              d="M3450 2941 c-19 -10 -48 -36 -64 -59 -51 -72 -46 -231 11 -319 22
-34 93 -56 159 -51 50 4 62 10 90 40 50 55 60 129 38 276 -7 44 -66 109 -112
122 -53 14 -83 12 -122 -9z"
            />
            <path
              d="M575 2634 c-64 -15 -90 -49 -101 -131 -6 -47 -5 -51 17 -56 13 -4 47
-7 75 -7 28 0 73 -7 99 -15 27 -8 50 -13 51 -12 2 1 0 52 -4 112 l-7 110 -55
2 c-30 0 -64 -1 -75 -3z"
            />
            <path
              d="M6132 1643 c-29 -4 -36 -12 -73 -84 l-40 -80 53 6 c71 8 172 24 231
37 39 8 47 14 47 32 0 29 -25 63 -60 81 -27 14 -84 17 -158 8z"
            />
            <path
              d="M4286 1529 c-74 -20 -100 -86 -94 -239 5 -127 16 -150 89 -188 75
-40 181 -14 220 55 47 79 44 188 -8 305 -24 54 -28 57 -67 63 -71 11 -110 12
-140 4z"
            />
            <path d="M3 2530 c0 -25 2 -35 4 -22 2 12 2 32 0 45 -2 12 -4 2 -4 -23z" />
            <path d="M4 2225 c0 -88 2 -123 3 -77 2 46 2 118 0 160 -1 42 -3 5 -3 -83z" />
            <path d="M1 2044 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
            <path d="M3 1985 c0 -22 2 -30 4 -17 2 12 2 30 0 40 -3 9 -5 -1 -4 -23z" />
            <path d="M2 1920 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z" />
            <path d="M2 1870 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z" />
            <path d="M3 1735 c0 -22 2 -30 4 -17 2 12 2 30 0 40 -3 9 -5 -1 -4 -23z" />
            <path d="M4 1535 c0 -71 1 -99 3 -62 2 37 2 96 0 130 -2 34 -3 4 -3 -68z" />
            <path d="M4 1285 c0 -55 1 -76 3 -47 2 29 2 74 0 100 -2 26 -3 2 -3 -53z" />
            <path d="M2 1105 c0 -16 2 -22 5 -12 2 9 2 23 0 30 -3 6 -5 -1 -5 -18z" />
            <path d="M4 950 c0 -69 1 -97 3 -62 2 34 2 90 0 125 -2 34 -3 6 -3 -63z" />
            <path d="M2 790 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z" />
            <path d="M2 740 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z" />
            <path d="M3 635 c0 -27 2 -38 4 -22 2 15 2 37 0 50 -2 12 -4 0 -4 -28z" />
            <path d="M1 484 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
            <path d="M1 414 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
            <path d="M4 280 c0 -52 1 -74 3 -47 2 26 2 68 0 95 -2 26 -3 4 -3 -48z" />
            <path d="M1 164 c0 -11 3 -14 6 -6 3 7 2 16 -1 19 -3 4 -6 -2 -5 -13z" />
            <path d="M3 65 c0 -38 2 -53 4 -32 2 20 2 52 0 70 -2 17 -4 1 -4 -38z" />
          </g>
        </svg>
      </a>
      <div className="footer__year">2022</div>
      <ul className="footer__links">
        <li>
          <a
            className="gitLink"
            href="https://github.com/SergeyKozlovskiy"
            rel="noreferrer"
            target="_blank"
          >
            <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="gitlogo-fill"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
              />
            </svg>
            Козловский Сергей
          </a>
        </li>
        <li>
          <a
            className="gitLink"
            href="https://github.com/VoitihovichP"
            rel="noreferrer"
            target="_blank"
          >
            <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="gitlogo-fill"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="#1B1F23"
              />
            </svg>
            Павел Войтехович
          </a>
        </li>
        <li>
          <a
            className="gitLink"
            href="https://github.com/Stellarator85"
            rel="noreferrer"
            target="_blank"
          >
            <svg viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                className="gitlogo-fill"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                transform="scale(64)"
                fill="#1B1F23"
              />
            </svg>
            Тимур Щербина
          </a>
        </li>
      </ul>
      {/* <a href="https://rs.school/" rel="noreferrer" target="_blank">
        <div className={Classes.footerRsSchool}>{Text.footerRsSchool}</div>
      </a>
      <div className={Classes.footerLogo}>
        {Text.footerLogo}
        <br></br>
        <span className={Classes.footerLogoSpan}>{Text.footerYearMark}</span>
      </div>
      <ul className={Classes.footerGithubLinks}>
        <a href="https://github.com/SergeyKozlovskiy" rel="noreferrer" target="_blank">
          <li className={Classes.footerGithubLinksItem}>{Text.footerGithubLinksItem1}</li>
        </a>
        <a href="https://github.com/VoitihovichP" rel="noreferrer" target="_blank">
          <li className={Classes.footerGithubLinksItem}>{Text.footerGithubLinksItem2}</li>
        </a>
        <a href="https://github.com/Stellarator85" rel="noreferrer" target="_blank">
          <li className={Classes.footerGithubLinksItem}>{Text.footerGithubLinksItem3}</li>
        </a>
      </ul> */}
    </footer>
  );
};
