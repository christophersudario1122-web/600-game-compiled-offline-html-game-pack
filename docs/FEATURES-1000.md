# ARCADE HUB — 1000 FEATURE MASTER LIST

Every feature below is implemented in `.hub/arcade-features.js`
(`window.Arcade`, registry + engine). Status: IMPLEMENTED unless noted.

## A. Core Hub & Library (1–250)

### A1. Search / Filter / Sort (1–40)
1. Instant search across game titles
2. Search by keyword/tag
3. Fuzzy-match search tolerance
4. Search highlight in results
5. Clear-search button
6. Search result count readout
7. Empty-search-state message
8. Filter by genre/category
9. Filter by multiplayer support
10. Filter by favorites only
11. Filter by unplayed only
12. Filter by highly rated (4★+)
13. Filter by recently played
14. Combine multiple filters (AND)
15. Reset all filters button
16. Sort by name A–Z
17. Sort by name Z–A
18. Sort by rating high→low
19. Sort by most played
20. Sort by recently played
21. Sort by newest added
22. Sort by playtime
23. Persist sort choice in localStorage
24. Persist filters in localStorage
25. Genre dropdown with counts
26. Case-insensitive search
27. Trim whitespace in queries
28. Debounced search input (150ms)
29. Search keyboard focus with `/`
30. Escape clears search
31. Filter pills UI with remove buttons
32. Result grid auto-reflow
33. Accessible labels on filter controls
34. Screen-reader result announcements
35. Search works offline
36. Search ignores diacritics
37. Multi-word AND search
38. Quoted-phrase search
39. Exclude-term search with `-`
40. Search history (last 10)

### A2. Game Tiles / Cards (41–90)
41. Game tile renders name + genre + rating
42. Game tile play button
43. Game tile favorite star toggle
44. Game tile star-rating widget
45. Game tile play-count badge
46. Game tile last-played badge
47. NEW badge for unplayed games
48. HOT badge for top-played games
49. Tile hover lift effect
50. Tile hover glow border
51. Tile keyboard-focusable
52. Tile Enter launches game
53. Tile lazy content build
54. Tile grid responsive columns
55. Tile art gradient per genre
56. Tile art emoji per genre
57. Tile description line
58. Tile controls row
59. Tile long-press = details (touch)
60. Tile right-click = context menu
61. Context menu: Play
62. Context menu: Favorite
63. Context menu: Rate
64. Context menu: Add note
65. Context menu: Copy link
66. Context menu: Hide game
67. Hidden-games manager list
68. Unhide game action
69. Tile pin-to-top action
70. Pinned section header
71. Unpin action
72. Tile shuffle animation
73. Tile skeleton while filtering
74. Tile count readout
75. Tile grid density toggle (cozy/comfortable/compact)
76. Persist grid density
77. Tile text truncation with ellipsis
78. Tile title tooltip (full name)
79. Tile rating average display
80. Tile user-rating display
81. Tile star partial fill
82. Tile playtime display (Xs/Xm/Xh)
83. Tile flag for broken link
84. Report-broken-link action
85. Tile share-link copy
86. Tile random-color seed stable per game
87. Tile focus-visible outline
88. Tile reduced-motion support
89. Tile print hidden (print CSS)
90. Tile list-view alternative layout

### A3. Launcher / Player (91–140)
91. Launch game in modal overlay
92. Launch game in new tab
93. Launch game fullscreen
94. Modal close button
95. Modal Escape to close
96. Modal click-backdrop to close
97. Confirm close while playing
98. Game iframe sandbox attrs
99. Iframe allow fullscreen
100. Iframe title attr (a11y)
101. Loading spinner while game loads
102. Load timeout message (15s)
103. Retry-load button
104. Open-direct-link button
105. Playtime stopwatch starts on launch
106. Playtime saved on close
107. Play count increments on launch
108. Last-played timestamp saved
109. Recent-activity entry added
110. Session stats overlay toggle
111. Session overlay: elapsed time
112. Session overlay: game name
113. Session overlay: play count
114. Session overlay: FPS meter
115. FPS meter rAF-based
116. Session overlay draggable
117. Session overlay collapsible
118. Exit fullscreen on close
119. Restore scroll on close
120. Focus trap in modal
121. Focus restore after close
122. Prevent background scroll when open
123. Game URL validation (http/file allow)
124. Block javascript: URLs
125. Missing-file friendly error
126. Offline-launch detection
127. Save window-size preference
128. Remember last launch mode
129. Auto-pause ambient audio in game
130. Resume ambient after close
131. Mute button inside modal
132. Reload-game button
133. Pop-out button (tab)
134. Game details pane (genre/desc/rating)
135. Per-game notes link in modal
136. Per-game rating link in modal
137. Keyboard: F fullscreen in modal
138. Keyboard: R reload in modal
139. Keyboard: Esc close modal
140. Touch: swipe-down to close

### A4. Random / Discovery (141–180)
141. Random game button
142. Random respects active filters
143. Random excludes hidden
144. Random shuffle animation
145. Random result announcement
146. Dice keyboard shortcut (R)
147. Surprise-me streak counter
148. Game of the day (date-seeded)
149. Game of the day tile
150. Trending top-5 strip
151. Most-played leaderboard
152. Top-rated leaderboard
153. Recently added row
154. Continue-playing row
155. Because-you-played-X suggestions
156. Genre explore chips
157. Genre game counts
158. Discover shuffle-all button
159. No-repeat random until pool exhausted
160. Random pool reset notice
161. Weighted random by rating
162. Never-played spotlight
163. Quick-play 60s timer mode
164. Quick-play end summary
165. Daily challenge game
166. Daily challenge streak
167. Genre of the day
168. Two-player picks row
169. Short-session picks (<5min tags)
170. Long-session picks
171. Kid-friendly filter preset
172. Retro filter preset
173. Puzzle filter preset
174. Action filter preset
175. Clear preset button
176. Discovery carousel arrows
177. Carousel keyboard nav
178. Carousel auto-advance toggle
179. Pause carousel on hover
180. Discovery empty-state tips

### A5. Favorites / Ratings / Notes (181–230)
181. Favorite toggle persists
182. Favorites counter
183. Favorites-only view
184. Star rating 1–5 persists per game
185. Rating average updates tile
186. Rating distribution counts
187. Clear rating action
188. Per-game note add/edit/delete
189. Notes character count
190. Notes timestamp
191. Notes list in Notes page
192. Note search
193. Note export (.json)
194. Note import (.json)
195. Recent activity feed (20)
196. Activity relative timestamps
197. Activity clear button
198. Play history log
199. History date grouping
200. Playtime per game total
201. Playtime formatting s/m/h
202. Playtime leaderboard
203. Total playtime stat
204. Session count stat
205. Unique games played stat
206. Completion % stat
207. Achievements list (first play, 10 plays, explorer, etc.)
208. Achievement unlock toast
209. Achievement progress bars
210. Achievement reset
211. Personal best per game (score field)
212. Best-score leaderboard
213. Win/loss log per game
214. Custom tags per game
215. Tag autocomplete
216. Tag filter integration
217. Tag manager (rename/delete)
218. Game status: backlog/playing/done
219. Status filter
220. Wishlist toggle
221. Wishlist view
222. Hide-game toggle
223. Blocked-content placeholder
224. Undo favorite action (toast)
225. Undo rating action (toast)
226. Undo hide action (toast)
227. Bulk favorite filtered games
228. Bulk hide filtered games
229. Bulk export filtered list
230. Data reset with double-confirm

### A6. Import / Export / Backup (231–250)
231. Export all data (.json download)
232. Export favorites only
233. Export notes only
234. Export ratings only
235. Export stats only
236. Export filename has date
237. Import data file picker
238. Import validation with errors
239. Import preview counts
240. Import merge (not overwrite)
241. Import overwrite option
242. Download backup one-click
243. Backup includes version stamp
244. Restore from backup
245. Settings sync across pages (same keys)
246. Storage usage readout
247. Storage quota warning
248. Corrupt-data recovery guard
249. Schema version migration
250. Reset-all with typed confirm
