var fs = require('fs');
var converter = require('csvtojson').Converter;
var converter = require('csvtojson').Converter;
var _ = require('lodash');
var d3 = require('d3');

var converter1 = new converter({});
var converter2 = new converter({});
var allCharacters = { characters: {}, excluding: {}, conversing: {} };
var allThemes = {};
var allWords = {};

// loaded data
var data = []; // characters, themes
var indices = [0, 0];
var prepositions = [];
var final = {};

function matchMetaToLyric(songNum, lineNum, type) {
  var meta = data[type];
  var index = indices[type];
  var start = _.split(meta[index].lines, '-');
  var end = parseInt(start[1]);
  start = parseInt(start[0]);
  var matched;
  // if song number matches, and line number is within start and end
  // or if we don't have an end, but the start matches
  // add the character data into the line data
  if (
    songNum === meta[index].song &&
    ((lineNum >= start && lineNum <= end) || (!end && lineNum === start))
  ) {
    matched = meta[index];
    // if lineNum is same as end,
    // or if there is no end, but start matches
    // move on to next character
    if (lineNum === end || (!end && lineNum === start)) {
      indices[type] += 1;
    }
  }
  return matched;
}

function saveLineData(lastLine) {
  // save lines by character
  keyByLine(allCharacters.characters, lastLine[1][0], lastLine[0]);
  keyByLine(allCharacters.excluding, lastLine[1][1], lastLine[0]);
  var conversing = _.chain(lastLine[1][0])
    .map(function(source) {
      return _.map(lastLine[1][2], function(target) {
        if (!target) return;
        return source + '-' + target;
      });
    })
    .flatten()
    .filter()
    .value();
  keyByLine(allCharacters.conversing, conversing, lastLine[0]);

  // then take care of the last line
  final[lastLine[0]] = lastLine;
}

function saveThemeData(lastLineTheme, lastTheme, character) {
  if (!lastTheme) return;

  // only push in the last line key if the last theme had multiple lines
  if (lastTheme && _.isString(lastTheme.lines)) {
    lastLineTheme[0].push(
      lastTheme.song +
        ':' +
        lastTheme.lines.split('-')[1] +
        '/' +
        character.lines
    );
  }
  // and then save it in allThemes
  keyByLine(allThemes, _.split(lastTheme.themes, '/'), lastLineTheme);
}

function keyByLine(obj, keys, line) {
  _.each(keys, function(key) {
    if (!obj[key]) {
      obj[key] = [];
    }
    obj[key].push(line);
  });
}

function saveData() {
  // first save final data
  fs.writeFile('src/data/lines.json', JSON.stringify(final));
  fs.writeFile('src/data/characters.json', JSON.stringify(allCharacters));
  fs.writeFile('src/data/themes.json', JSON.stringify(allThemes));
  fs.writeFile('src/data/words.json', JSON.stringify(allWords));
}

function parseSong(songNum) {
  if (songNum > 46) {
    saveData();
    return;
  }
  console.log(songNum);
  // remember what the last line and characters were
  var lastLine = null;
  var lastCharacter = null;
  var lastLineTheme = null; // save the themes in the context of the lines
  var lastTheme = null;
  fs.readFile('processed/' + songNum + '.json', function(err, lines) {
    lines = JSON.parse(lines);
    _.each(lines, function(line, lineNum) {
      lineNum += 1;
      var character = matchMetaToLyric(songNum, lineNum, 0);
      var theme = matchMetaToLyric(songNum, lineNum, 1);

      // the theme isn't the same as the last one
      if (!_.isEqual(lastTheme, theme)) {
        // if there's a previous theme, save it
        saveThemeData(lastLineTheme, lastTheme, lastCharacter);

        // and then create the next one with line key and actual line
        // only if there is a theme
        if (theme) {
          lastLineTheme = [
            [songNum + ':' + lineNum + '/' + character.lines],
            [line[0]]
          ];
        }
      } else if (theme && _.isEqual(lastTheme, theme)) {
        // if the theme is still the same, push in the line
        // we don't want to push in song/line number unless the character changes
        lastLineTheme[1].push(line[0]);
      }

      // if this is the first line of the song
      // or if it's a new character singing
      if (!lastLine || !_.isEqual(lastCharacter, character)) {
        if (lastLine) {
          saveLineData(lastLine);
        }

        // now that last line has been saved
        // set the current line to it
        lastLine = [
          songNum + ':' + character.lines,
          [
            _.split(character.characters, '/'),
            _.split(character.excluding, '/'),
            _.split(character.directed_to, '/')
          ],
          [line[0]],
          1 // length of lines for this character
        ];

        // and if the theme is the same as the last
        // but it's a new character singing, save the line key
        if (theme && _.isEqual(lastTheme, theme)) {
          lastLineTheme[0].push(
            songNum + ':' + lineNum + '/' + character.lines
          );
        }
      } else {
        // if there is a last line and the characters are the same
        // just push this line into the last line
        lastLine[2].push(line[0]);
        lastLine[3] += 1;
      }

      // and by words (filter out prepositions)
      var words = _.chain(line[0].replace(/[^a-zA-Z\'\’]/g, ' ').split(' '))
        .map(function(word) {
          return word.toLowerCase();
        })
        .uniq()
        .reject(function(word) {
          return _.includes(prepositions, word);
        })
        .value();
      keyByLine(allWords, words, songNum + ':' + lineNum + '/' + lastLine[0]);

      // if this is actually the last line, also save the song
      if (lineNum === lines.length) {
        saveLineData(lastLine);
        saveThemeData(lastLineTheme, lastTheme, character);
      }

      lastCharacter = character;
      lastTheme = theme;
    });
    // go to next song
    parseSong(songNum + 1);
  });
}

converter2.on('end_parsed', function(themes) {
  data.push(themes);
  fs.readFile('data/prepositions.txt', 'utf8', function(err, prep) {
    prepositions = prep.split('\n');
    parseSong(1);
  });
});

converter1.on('end_parsed', function(characters) {
  data.push(characters);
  require('fs')
    .createReadStream('data/meta/themes.csv')
    .pipe(converter2);
});
require('fs')
  .createReadStream('data/meta/characters.csv')
  .pipe(converter1);
