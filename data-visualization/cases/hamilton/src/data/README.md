You can find all processed data for the Hamilton dataviz project here.  For the raw version, go [here](https://github.com/sxywu/hamilton/tree/master/data).

Files explained
===

* [lines.json](https://github.com/sxywu/hamilton/blob/master/src/data/lines.json): an object keyed by song and line number, and values are the set of consecutive lines by a singer.
* [themes.json](https://github.com/sxywu/hamilton/blob/master/src/data/themes.json): an object keyed by theme id (made up by me), and values are the array of lines with that theme
* [characters.json](https://github.com/sxywu/hamilton/blob/master/src/data/characters.json)(never used): an object with characters and conversations, keyed by their id's and the values are the line keys
* [words.json](https://github.com/sxywu/hamilton/blob/master/src/data/words.json)(never used): object keyed by all the words in the musical and the values are the corresponding lines

### Metadata

* [char_list.json](https://github.com/sxywu/hamilton/blob/master/src/data/char_list.json)
* [song_list.json](https://github.com/sxywu/hamilton/blob/master/src/data/song_list.json)
* [theme_list.json](https://github.com/sxywu/hamilton/blob/master/src/data/theme_list.json)

### Positions

* [char_positions.json](https://github.com/sxywu/hamilton/blob/master/src/data/char_positions.json): positions of characters and conversations as node-and-link graph
* [line_char_positions.json](https://github.com/sxywu/hamilton/blob/master/src/data/line_char_positions.json): positions of line dots grouped by character
* [line_image_positions.json](https://github.com/sxywu/hamilton/blob/master/src/data/line_image_positions.json): positions of line dots in the shape of Hamilton musical logo
* [line_song_positions.json](https://github.com/sxywu/hamilton/blob/master/src/data/line_song_positions.json): positions of line dots grouped by song

How to read
===

### lines.json

* key: line key
 * [song_id]:[start_line_number]-[end_line_number]
 * (example) `1:31` would be song 1, line 31
 * (example) `1:1-5` would be song 1, lines 1 through 5
* value: array of 4 values
 * 0: line key
 * 1: array
  * 0: character(s) singing
  * 1: character(s) excluded from singing
  * 2: character(s) the lines were directed to
 * 2: array of the actual lyrics in those lines
 * 3: number of lines

### themes.json

* key: theme_id
* value: array of all lines with the theme
 * 0: modified line keys
  * [song_id]:[line_number]/[corresponding_line_key]
  * (example): `43:9/1-9` would be a theme at song 43 line 9 in the set of lines `43:1-9`
 * 1: array of the actual lyrics
