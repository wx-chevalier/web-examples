import _ from 'lodash';
import * as d3 from 'd3';

var FilterGraph = {
  filterForCharacters(
    data,
    selectedCharacters,
    selectedConversation,
    highlightedSong
  ) {
    var { filteredLines } = FilterGraph.filterLinesBySelectedCharacter(
      selectedCharacters,
      selectedConversation,
      data.lines
    );
    var { songPositions } = FilterGraph.filterSongsByRemainingLines(
      filteredLines,
      data.songs,
      highlightedSong
    );
    var { characterNodes, characterLinks } = FilterGraph.updateFilterOpacities(
      filteredLines,
      null,
      data.characters,
      data.conversations,
      null,
      selectedCharacters,
      selectedConversation,
      null
    );

    return {
      linePositions: filteredLines,
      songPositions,
      characterNodes,
      characterLinks
    };
  },

  filterForThemes(data, selectedThemes, highlightedSong) {
    var { filteredLines } = FilterGraph.filterLinesBySelectedCharacter(
      [],
      [],
      data.lines
    );
    var { filteredLines2 } = FilterGraph.filterLinesBySelectedThemes(
      selectedThemes,
      filteredLines
    );
    var { songPositions } = FilterGraph.filterSongsByRemainingLines(
      filteredLines2,
      data.songs,
      highlightedSong
    );
    var { filteredDiamonds } = FilterGraph.filterDiamondsByRemainingLines(
      filteredLines2,
      data.diamonds
    );
    var { groupedThemes } = FilterGraph.updateFilterOpacities(
      filteredLines2,
      filteredDiamonds,
      null,
      null,
      data.groupedThemes,
      null,
      null,
      selectedThemes
    );

    return {
      linePositions: filteredLines2,
      diamondPositions: filteredDiamonds,
      songPositions,
      groupedThemes
    };
  },

  filterForAll(data, selectedCharacters, selectedConversation, selectedThemes) {
    var { filteredLines } = FilterGraph.filterLinesBySelectedCharacter(
      selectedCharacters,
      selectedConversation,
      data.lines
    );
    var { filteredLines2 } = FilterGraph.filterLinesBySelectedThemes(
      selectedThemes,
      filteredLines
    );
    var { songPositions } = FilterGraph.filterSongsByRemainingLines(
      filteredLines2,
      data.songs
    );
    var { filteredDiamonds } = FilterGraph.filterDiamondsByRemainingLines(
      filteredLines2,
      data.diamonds
    );
    var {
      characterNodes,
      characterLinks,
      groupedThemes
    } = FilterGraph.updateFilterOpacities(
      filteredLines2,
      filteredDiamonds,
      data.characters,
      data.conversations,
      data.groupedThemes,
      selectedCharacters,
      selectedConversation,
      selectedThemes
    );

    return {
      linePositions: filteredLines2,
      diamondPositions: filteredDiamonds,
      songPositions,
      groupedThemes,
      characterNodes,
      characterLinks
    };
  },

  updateFilterOpacities(
    lines,
    diamonds,
    characterNodes,
    characterLinks,
    groupedThemes,
    selectedCharacters,
    selectedConversation,
    selectedThemes
  ) {
    var nonSelected =
      _.isEmpty(selectedCharacters) &&
      _.isEmpty(selectedConversation) &&
      _.isEmpty(selectedThemes);

    var availableCharacters = _.chain(lines)
      .map('characterId')
      .uniq()
      .value();
    var availableConversations = _.chain(lines)
      .map('conversing')
      .uniq()
      .value();
    var selectedLines = _.filter(lines, 'selected');
    var filteredCharacters = _.chain(selectedLines)
      .map('characterId')
      .uniq()
      .value();
    var filteredConversation = _.chain(selectedLines)
      .map('conversing')
      .uniq()
      .value();

    if (!_.isEmpty(selectedThemes)) {
      // only if there are themes selected, intersect the characters and conversations
      var selectedThemeCharacters = _.chain(diamonds)
        .filter('selected')
        .map('characterIds')
        .flatten()
        .uniq()
        .value();
      var selectedThemeConversations = _.chain(diamonds)
        .filter('selected')
        .map('conversationIds')
        .flatten()
        .uniq()
        .value();
      availableCharacters = _.intersection(
        availableCharacters,
        selectedThemeCharacters
      );
      availableConversations = _.intersection(
        availableConversations,
        selectedThemeConversations
      );
      filteredCharacters = _.intersection(
        filteredCharacters,
        selectedThemeCharacters
      );
      filteredConversation = _.intersection(
        filteredConversation,
        selectedThemeConversations
      );
    }

    characterNodes = _.chain(characterNodes)
      .map(node => {
        node.available = _.includes(availableCharacters, node.id);
        node.selected = nonSelected || _.includes(selectedCharacters, node.id);
        node.filtered = _.includes(filteredCharacters, node.id);
        return node;
      })
      .value();
    characterLinks = _.chain(characterLinks)
      .map(link => {
        link.available = _.includes(availableConversations, link.id);
        link.selected =
          nonSelected || _.includes(selectedConversation, link.id);
        link.filtered = _.includes(filteredConversation, link.id);
        return link;
      })
      .value();

    var availableDiamonds = _.chain(diamonds)
      .map('themeId')
      .uniq()
      .value();
    var filteredDiamonds = _.chain(diamonds)
      .filter('selected')
      .map('themeId')
      .uniq()
      .value();
    var countedDiamonds = _.countBy(diamonds, 'themeId');
    _.each(groupedThemes, theme => {
      _.each(theme.diamonds, (diamond, i) => {
        diamond.available = _.includes(availableDiamonds, diamond.id);
        diamond.selected =
          nonSelected || _.includes(selectedThemes, diamond.id);
        diamond.filtered = _.includes(filteredDiamonds, diamond.id);
        diamond.length = countedDiamonds[diamond.id] || 0;
      });
    });

    return { characterNodes, characterLinks, groupedThemes };
  },

  filterLinesBySelectedCharacter(
    selectedCharacters,
    selectedConversation,
    lines
  ) {
    var filteredLines = lines;
    if (!_.isEmpty(selectedCharacters)) {
      filteredLines = _.chain(lines)
        .groupBy(line => line.songId)
        .filter(lines => {
          // only keep the song if all the selected characters are in it
          return _.chain(lines)
            .map(line => {
              // also use this chance to update the fill based on selected characters
              line.selected = _.includes(selectedCharacters, line.characterId);
              return line.characterId;
            })
            .uniq()
            .intersection(selectedCharacters)
            .sortBy()
            .isEqual(selectedCharacters)
            .value();
        })
        .flatten()
        .value();
    }
    if (!_.isEmpty(selectedConversation)) {
      filteredLines = _.chain(filteredLines)
        .groupBy(line => line.songId)
        .filter(lines => {
          // if even one of the lines
          var atLeastOne = false;
          _.each(lines, line => {
            var selected = _.includes(selectedConversation, line.conversing);
            // if there's also selected characters take that into consideration
            line.selected = !_.isEmpty(selectedCharacters)
              ? line.selected || selected
              : selected;

            atLeastOne = atLeastOne || selected;
          });
          return atLeastOne;
        })
        .flatten()
        .value();
    }

    if (_.isEmpty(selectedCharacters) && _.isEmpty(selectedConversation)) {
      filteredLines = _.map(filteredLines, line => {
        line.selected = true;
        return line;
      });
    }

    return { filteredLines };
  },

  filterLinesBySelectedThemes(selectedThemes, lines) {
    // first take out the themes
    var filteredLines2 = lines;
    if (!_.isEmpty(selectedThemes)) {
      filteredLines2 = _.chain(filteredLines2)
        .groupBy(line => line.songId)
        .filter(lines => {
          var atLeastOne = false;
          _.each(lines, line => {
            line.selected =
              line.selected &&
              _.some(line.themes, theme =>
                // theme[0] is the theme id, the rest are start and end lines
                _.includes(selectedThemes, theme[0])
              );

            atLeastOne = atLeastOne || line.selected;
          });
          return atLeastOne;
        })
        .flatten()
        .value();
    }

    return { filteredLines2 };
  },

  filterSongsByRemainingLines(lines, songs, highlightedSong) {
    var songIds = _.keyBy(lines, 'songId');
    var songPositions = _.filter(songs, song => {
      song.prevHighlighted = song.highlighted;
      song.highlighted = !highlightedSong || highlightedSong === song.id;
      return songIds[song.id];
    });

    return { songPositions };
  },

  filterDiamondsByRemainingLines(lines, diamonds) {
    var linesById = _.groupBy(lines, 'lineId');
    var filteredDiamonds = _.filter(diamonds, diamond => {
      var startLine = linesById[diamond.startLineId];
      var endLine = linesById[diamond.endLineId];
      // keep a theme if either its start or end is in a selected character's line
      return (
        (startLine && _.some(startLine, 'selected')) ||
        (endLine && _.some(endLine, 'selected'))
      );
    });

    return { filteredDiamonds };
  }
};

export default FilterGraph;
