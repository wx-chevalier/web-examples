import _ from 'lodash';

import FilterGraph from '../FilterGraph';
import PositionGraph from '../PositionGraph';

var padding = 20;
var paddingTop = 100;
var marginBottom = 400;

function sections(width, vizWidth, sectionWidth, images, isMobile) {
  function positionAngelica(
    data,
    selectedCharacters,
    selectedConversation,
    highlightedSong
  ) {
    selectedCharacters = _.chain(selectedCharacters)
      .union(['2', '8'])
      .sortBy()
      .value();
    var {
      linePositions,
      songPositions,
      characterNodes,
      characterLinks
    } = FilterGraph.filterForCharacters(
      data,
      selectedCharacters,
      selectedConversation,
      highlightedSong
    );

    var left = isMobile ? 0 : sectionWidth;
    var {
      linePositions,
      songPositions,
      top
    } = PositionGraph.positionForCharacters(
      linePositions,
      songPositions,
      vizWidth,
      left,
      paddingTop / 6,
      highlightedSong
    );

    return {
      linePositions,
      songPositions,
      diamondPositions: [],
      characterNodes,
      characterLinks,
      selectedCharacters,
      selectedConversation,
      top
    };
  }

  function positionEliza(data, selectedThemes, highlightedSong) {
    selectedThemes = _.union(selectedThemes, ['10', '18']);
    var {
      linePositions,
      songPositions,
      diamondPositions,
      groupedThemes
    } = FilterGraph.filterForThemes(data, selectedThemes, highlightedSong);

    var left = isMobile ? 0 : sectionWidth;
    var {
      linePositions,
      songPositions,
      diamondPositions,
      top
    } = PositionGraph.positionForAll(
      linePositions,
      diamondPositions,
      songPositions,
      vizWidth,
      left,
      paddingTop / 6,
      highlightedSong
    );

    return {
      linePositions,
      songPositions,
      diamondPositions,
      groupedThemes,
      selectedThemes,
      top
    };
  }

  return [
    {
      id: 'header',
      random: true,
      style: {
        paddingTop: (isMobile ? 1.5 : 2.5) * paddingTop,
        height: 500,
        width: isMobile ? '85%' : '60%',
        margin: 'auto',
        marginBottom
      },
      position(data) {
        _.each(data.lines, line => (line.selected = true));
        var imageWidth = isMobile ? vizWidth * 1.5 : vizWidth;
        var left = (width - imageWidth) / 2;
        return PositionGraph.positionLinesAsImage(
          data.lines,
          imageWidth,
          left,
          paddingTop
        );
      },
      text: `
  <center>
    <h1 style='line-height: 1.25'>
      <span class='background'>
        An Interactive Visualization of<br />
        Every Line in Hamilton
      </span>
    </h1>
    <sup>
      <span class='background'>
        By [SHIRLEY WU](http://twitter.com/sxywu)
      <span>
    </sup>
    <div style='padding-top: ${isMobile ? '50px' : '150px'}'>
      <div style='font-size: 12px'>
        ${
          isMobile
            ? `<span class='background'>For full set of interactions</span><br />
          <span class='background'>please view on desktop</span>`
            : `<span class='background'>Best on **Chrome** with</span><br />
          <span class='background'>resolution higher than **1280x800** ✨</span>`
        }
      </div>
      <h2 style='margin-top: 0px'>
        <span class='background'>Scroll</span><br />
        <span class='background'>↓</span>
      </h2>
    </div>
  </center>
      `
    },
    {
      id: 'intro1',
      random: true,
      style: {
        margin: 'auto',
        marginBottom: 250,
        height: isMobile ? 500 : 200,
        width: isMobile ? sectionWidth : vizWidth,
        padding: 0
      },
      contentStyle: {
        backgroundColor: 'rgb(53,169,147)',
        color: '#fff',
        textAlign: 'center',
        padding: isMobile ? '10px' : '40px 80px',
        pointerEvents: 'auto'
      },
      position(data) {
        _.each(data.lines, line => (line.selected = true));
        var positions = PositionGraph.positionLinesRandomly(data.lines, width);
        positions.random = true;

        return positions;
      },
      text: `
<img src=${images['2']} width='60' />
## A hip-hop musical, really?

When I first heard of Hamilton, I was doubtful ("a *hip-hop* musical?").  But from the moment I sat down to listen the whole way through, I was done for.

I was obsessed.  I had the cast recording on repeat for months, it was all I listened to in my waking hours.  I listened so much I had favorite lines and favorite songs.  I analyzed the lyrics; I reveled in the layers of complexity, the double entendres, the clever word plays.

Then my obsession hit a peak; I kept wondering, *what would a visualization of Hamilton look like?*  I couldn't stop thinking about it.

# ✨✨✨

When I started digging through the lyrics, I was curious about two things: the relationships between the main characters, and the recurring phrases associated with those characters.

So I went through every single line in Hamilton (twice 😱 ) and recorded who sang each line, as well as who that line may have been directed towards.  I've noted every phrase that was sung more than once across more than one song, and grouped them into broad themes*.  You can find my lovingly (obsessively) curated data [here](https://github.com/sxywu/hamilton/tree/master/src/data).

To explore the data, I created a visual tool to filter the lines by any combination of characters, conversations, and themes.  The insights were *amazing*, and I'm excited to share with you both the **visual tool** and my **analysis** of Hamilton with it.

<p style='line-height: 1.25'>
  <sup><em>*Though I am unconscious of intentional error, I am nevertheless too sensible of my defects not to think it probable that I may have committed many errors.</em></sup>
</p>
      `
    },
    {
      id: 'songs',
      random: true,
      left: sectionWidth,
      style: {
        paddingTop: 650,
        marginBottom,
        height: 900,
        width: isMobile ? sectionWidth : '100%',
        textAlign: 'center',
        padding: 0
      },
      contentStyle: {
        paddingTop: 300
      },
      position(data, selectedCharacters, selectedConversation) {
        _.each(data.lines, line => (line.selected = true));

        var songWidth = 800;
        var left = (width - songWidth) / 2;
        var {
          linePositions,
          songPositions
        } = PositionGraph.positionLinesBySong(
          data.lines,
          left,
          this.style.paddingTop
        );
        return { linePositions, songPositions };
      },
      text: `
<h3>
  <span class='background'>
Each circle is a set of lines, colored by singer.
  </span><br />
  ${
    isMobile
      ? `
<span class='background'>
  Switch to desktop to explore
</span><br />
<span class='background'>
  corresponding lyrics.
</span><br />
    `
      : `
<span class='background'>
  Hover over any of them to see the lyrics.
</span><br />
<span class='background'>
  (Some of the longer tooltips are scrollable!)
</span>
  `
  }
</h3>
      `
    },
    {
      id: 'angelica_intro',
      random: true,
      style: {
        margin: 'auto',
        marginBottom,
        width: sectionWidth,
        padding: 0
      },
      contentStyle: {
        backgroundColor: 'rgb(204,119,170)',
        color: '#fff',
        textAlign: 'center',
        padding: isMobile ? '10px' : '40px 80px',
        pointerEvents: 'auto'
      },
      position(data, selectedCharacters, selectedConversation) {
        _.each(data.lines, line => (line.selected = true));
        var positions = PositionGraph.positionLinesRandomly(data.lines, width);
        positions.random = true;

        return positions;
      },
      text: `
<center>
  <img src=${images['8']} width='60' />
</center>

When I started to explore the data and filter down by sets of characters - Alexander with Aaron Burr, Angelica with Eliza, Angelica and Eliza and Alexander - I was struck by their stories within the story.  My favorite is the relationship between Angelica and Alexander, as they flirt and mature and finally **put Eliza first**.
      `
    },
    {
      id: 'angelica1',
      consecutive: true,
      style: {
        paddingTop,
        textAlign: 'center',
        paddingBottom: isMobile ? window.innerHeight / 2 : padding
      },
      filter: isMobile ? '' : 'characters',
      position(data, selectedCharacters, selectedConversation) {
        return positionAngelica(data, selectedCharacters, selectedConversation);
      },
      text: `
<h3>
  <span class='background'>
${isMobile ? 'These are the songs' : 'Songs'} filtered by Angelica and Alexander
  </span><br />
${
        isMobile
          ? ''
          : `  <span class='background'>
→
  </span>
`
      }
</h3>

${
        isMobile
          ? ''
          : `
  <h3>
    <span class='background'>
  Here's what the filter looks like.
    </span></br>
  </h3>
A highlighted character or conversation means it's been selected. If it's grayed out, it can be clicked on to filter further.
As you filter, **characters or conversations will disappear** because they are no longer in the songs left; you can find co-appearances this way 👍
  <h3>
    <span class='background'>
  Try playing with the filters.
    </span><br />
    <span class='background'>
  (Here's a <span class='underline reset'>reset</span> just in case.)
    </span><br />
    <span class='background'>
  ↓
    </span>
  </h3>`
      }
      `
    },
    {
      id: 'angelica2',
      consecutive: true,
      highlightedSong: '26',
      style: {
        paddingTop,
        paddingBottom: isMobile ? window.innerHeight / 2 : padding
      },
      contentStyle: {
        padding: 10,
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : ''
      },
      clips: [
        ['/music/andthereyouare.mp3', ['8/26:23-27', '2/26:23-27']],
        ['/music/youwontbe.mp3', ['8/26:85-86', '2/26:85-86']]
      ],
      position(data, selectedCharacters, selectedConversation) {
        return positionAngelica(
          data,
          selectedCharacters,
          selectedConversation,
          this.highlightedSong
        );
      },
      text: `
  ### An Ocean Away

  Angelica Schuyler is Alexander Hamilton's sister-in-law, the one who introduces Alexander to her sister Eliza Schuyler.  Angelica and Alexander's relationship is ambiguously flirtateous from the very start, their exchanges in *Satisfied* puntuated by mutual understanding - that they're both never satisfied.

  Their flirtation is amplified in *Take A Break*, the only time in the whole musical they sing together:

  <span class='music' data-char='2' data-clip='0'>
    <span class='control'></span>
    And there you are, an ocean away &nbsp;<br />
    &nbsp; Do you have to live an ocean away? &nbsp;<br />
    &nbsp; Thoughts of you subside &nbsp;<br />
    &nbsp; Then I get another letter &nbsp;<br />
    &nbsp; I cannot put the notion away… &nbsp;<br />
  </span>

  They continue as Angelica visits from London:

  <span class='music' data-char='8' data-clip='1'>
    <span class='control'></span>
    You won’t be an ocean away &nbsp;<br />
    &nbsp; You will only be a moment away… &nbsp;<br />
  </span>

  And they leave us wondering: did they, or didn't they?
      `
    },
    {
      id: 'angelica3',
      consecutive: true,
      highlightedSong: '37',
      style: {
        paddingTop,
        paddingBottom: isMobile ? window.innerHeight / 2 : padding
      },
      contentStyle: {
        padding: 10,
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : ''
      },
      clips: [
        ['/music/angelicathankgod.mp3', ['2/37:32-33']],
        ['/music/iknowmysister.mp3', ['8/37:36-43']],
        ['/music/hewillnever.mp3', ['8/11:92-111']]
      ],
      position(data, selectedCharacters, selectedConversation) {
        return positionAngelica(
          data,
          selectedCharacters,
          selectedConversation,
          this.highlightedSong
        );
      },
      text: `
  ### I'm Standing At Her Side

  The turning point in Angelica and Alexander's relationship comes in *The Reynolds Pamphlet*, after Alexander publishes the details of his affair with Maria Reynolds to save his political reputation.  When Angelica hurries back from London, Alexander is relieved:

  <span class='music' data-char='2' data-clip='0'>
    <span class='control'></span>
    Angelica, thank God &nbsp;<br />
    &nbsp; Someone who understands what I’m struggling here to do<br />
  </span>

  Angelica instead replies:

  <span class='music' data-char='8' data-clip='1'>
    <span class='control'></span>
    I know my sister like I know my own mind &nbsp;<br />
    &nbsp; You will never find anyone as trusting or as kind &nbsp;<br />
    &nbsp; I love my sister more than anything in this life &nbsp;<br />
    &nbsp; I will choose her happiness over mine every time &nbsp;<br />
    &nbsp; Put what we had aside &nbsp;<br />
    &nbsp; I’m standing at her side &nbsp;<br />
    &nbsp; You could never be satisfied &nbsp;<br />
    &nbsp; God, I hope you’re satisfied &nbsp;<br />
  </span>

  And here Angelica has matured; when she first introduces Eliza to Alexander in *Satisfied*, she does so because she knows Eliza is in love with him.  She believes that Eliza (*you will never find anyone as trusting or as kind*) is a better match for Alexander.  But most of all, she does so for herself, because she knows:

  <span class='music' data-char='8' data-clip='2'>
    <span class='control'></span>He will never be satisfied, I will never be satisfied &nbsp;<br />
  </span>

  After the Reynolds affair, she puts Eliza first, for Eliza's sake; she sings only that Alexander could never be satisfied.
      `
    },
    {
      id: 'angelica4',
      consecutive: true,
      highlightedSong: '41',
      random: true,
      style: {
        height: 150,
        paddingTop,
        paddingBottom: isMobile ? window.innerHeight / 2 : padding,
        marginBottom: marginBottom + 200
      },
      contentStyle: {
        padding: 10,
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : ''
      },
      position(data, selectedCharacters, selectedConversation) {
        return positionAngelica(
          data,
          selectedCharacters,
          selectedConversation,
          this.highlightedSong
        );
      },
      text: `
  ### She Takes His Hand

  *It's Quiet Uptown* is the only song that starts with Angelica, as she and Alexander take turns narrating the aftermath of the Hamiltons losing their eldest son.  Angelica watches over as Alexander finally puts Eliza first, as he tries to reach out to an unmoving Eliza, and as they reconcile; it is the most beautifully satisfying close to Angelica and Alexander's story.

  Angelica does not re-appear with Alexander until his death in *The World Was Wide Enough*.
      `
    },
    {
      id: 'eliza_intro',
      random: true,
      style: {
        margin: 'auto',
        marginBottom,
        width: sectionWidth,
        padding: 0
      },
      contentStyle: {
        backgroundColor: 'rgb(81,173,223)',
        color: '#fff',
        textAlign: 'center',
        padding: isMobile ? '10px' : '40px 80px',
        pointerEvents: 'auto'
      },
      position(data, selectedCharacters, selectedConversation) {
        _.each(data.lines, line => (line.selected = true));
        var positions = PositionGraph.positionLinesRandomly(data.lines, width);
        positions.random = true;

        return positions;
      },
      text: `
<center>
  <img src=${images['7']} width='60' />
</center>

When I first heard the cast recording, I didn't care much for Eliza; she was shy and reserved and completely overshadowed by her sister.  But as I listened and dug more into her story, I was blown away by her quiet grace and by how much she grew throughout the story.  To me, she is the real star of the show.
      `
    },
    {
      id: 'eliza1',
      consecutive: true,
      style: {
        paddingTop,
        textAlign: 'center',
        paddingBottom: isMobile ? window.innerHeight / 2 : padding
      },
      filter: isMobile ? '' : 'themes',
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes);
      },
      text: `
${
        isMobile
          ? `<div style='background-color: rgba(255, 255, 255, 0.9); padding: 10'>
The songs are filtered by two recurring phrases of Contentment: "that would be enough" (<em>c2</em>) and "look around at how lucky we are to be alive right now" (<em>c3</em>). These are the phrases most commonly attributed to Eliza.
</div>`
          : ''
      }

<center>
  <h3>
    <span class='background'>
  Curves above lines indicate recurring phrases.
    </span><br />
${
        isMobile
          ? ''
          : `
<span class='background'>
→
</span>
`
      }
  </h3>
${
        isMobile
          ? ''
          : `
<h3>
  <span class='background'>
Phrases are grouped into themes.
  </span><br />
</h3>
The songs are filtered by two recurring phrases of Contentment: "that would be enough" (<em>c2</em>) and "look around at how lucky we are to be alive right now" (<em>c3</em>).
**Many of the themes are blank** since they don't co-occur with the filtered themes.
<h3>
  <span class='background'>
↓
  </span>
</h3>
`
      }
</center>
      `
    },
    {
      id: 'eliza2',
      consecutive: true,
      highlightedSong: '17',
      style: {
        paddingTop,
        paddingBottom: isMobile ? window.innerHeight / 2 : padding
      },
      contentStyle: {
        padding: 10,
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : ''
      },
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes, this.highlightedSong);
      },
      clips: [
        ['/music/irelishbeing.mp3', ['7/17:18-45']],
        ['/music/wedontneed.mp3', ['7/17:18-45']]
      ],
      text: `
  ### Look Around

  Eliza Schuyler is the second daughter of a wealthy New York family, and her upbringing has afforded her an idealistic outlook on life.  When she meets Alexander, she lacks Angelica's understanding of Alexander's ambition, and she is helplessly in love.

  That confident optimism is highlighted in *That Would Be Enough*, when Alexander is on leave from the war.  Downtrodden that he may never be given command, he asks Eliza if she'll relish being a poor man's wife.  She responds:

  <span class='music' data-char='7' data-clip='0'>
    <span class='control'></span>
    I relish being your wife &nbsp;<br />
    &nbsp; Look around, look around… &nbsp;<br />
    &nbsp; Look at where you are &nbsp;<br />
    &nbsp; Look at where you started &nbsp;<br />
    &nbsp; The fact that you’re alive is a miracle &nbsp;<br />
    &nbsp; Just stay alive, that would be enough &nbsp;<br />
  </span>

  And she continues:

  <span class='music' data-char='7' data-clip='1'>
    <span class='control'></span>
    We don’t need a legacy &nbsp;<br />
    &nbsp; We don’t need money &nbsp;<br />
    &nbsp; If I could grant you peace of mind &nbsp;<br />
    &nbsp; If you could let me inside your heart… &nbsp;<br />
    &nbsp; Oh, let me be a part of the narrative &nbsp;<br />
    &nbsp; In the story they will write someday &nbsp;<br />
  </span>

  They're newly married with a child on the way, and Eliza knows exactly what she wants from him: for him to stay, and for her to be a part of his story.
      `
    },
    {
      id: 'eliza3',
      consecutive: true,
      highlightedSong: '23',
      style: {
        paddingTop,
        paddingBottom: isMobile ? window.innerHeight / 2 : padding
      },
      contentStyle: {
        padding: 10,
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : ''
      },
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes, this.highlightedSong);
      },
      clips: [
        ['/music/andifyourwife.mp3', ['7/23:122-128']],
        ['/music/lookaround.mp3', ['2/23:157']]
      ],
      text: `
  ### They're Asking Me To Lead

  The next time Eliza appears with Alexander is in *Non-Stop* after the war.  Alexander works (non-stop) as a lawyer, is invited to the Constitutional Convention, and writes majority of the Federalist Papers.  Eliza pleads with him:

  <span class='music' data-char='7' data-clip='0'>
    <span class='control'></span>
    And if your wife could share a fraction of your time &nbsp;<br />
    &nbsp; If I could grant you peace of mind &nbsp;<br />
    &nbsp; Would that be enough? &nbsp;<br />
  </span>

  Eliza's lines are similar to the ones she sung in *That Would Be Enough*, but the subtle changes highlight two things: Eliza is starting to realize the extent of Alexander's ambitions, and she is left unsure of her own role.

  The most heartbreaking moment comes when George Washington asks Alexander to join his cabinet as Treasury Secretary, and Eliza instead asks Alexander to stay.  Alexander responds with the very lines that Eliza uses to reassure him in *That Would Be Enough*, using them instead as his reason to leave:

  <span class='music' data-char='2' data-clip='1'>
    <span class='control'></span>Look around, look around at how lucky we are to be alive right now &nbsp;
  </span>

  In return, Eliza sings only one word: *helpless*.  It is the last time she sings *helpless* in the whole musical.
      `
    },
    {
      id: 'eliza4',
      consecutive: true,
      highlightedSong: '41',
      style: {
        paddingTop,
        paddingBottom: isMobile ? window.innerHeight / 2 : padding
      },
      contentStyle: {
        padding: 10,
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : ''
      },
      clips: [
        ['/music/lookatwhere.mp3', ['2/41:25-40']],
        ['/music/forgiveness.mp3', ['24/41:56-59']]
      ],
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes, this.highlightedSong);
      },
      text: `
  ### Forgiveness

  When Eliza learns of Alexander's affair with Maria Reynolds, she burns their letters, determined to write herself out of the narrative.  But when their eldest son Philip dies in a duel, she is grief-stricken, mute throughout *It's Quiet Uptown*, and Alexander tries to get through to her.

  He again mirrors Eliza's lines from *That Would Be Enough*, but this time, he asks to stay:

  <span class='music' data-char='2' data-clip='0'>
    <span class='control'></span>
    Look at where we are &nbsp;<br />
    &nbsp; Look at where we started &nbsp;<br />
    &nbsp; I know I don’t deserve you, Eliza &nbsp;<br />
    &nbsp; But hear me out. That would be enough &nbsp;<br />
    &nbsp; If I could spare his life &nbsp;<br />
    &nbsp; If I could trade his life for mine &nbsp;<br />
    &nbsp; He’d be standing here right now &nbsp;<br />
    &nbsp; And you would smile, and that would be enough &nbsp;<br />
  </span>

  There is a moment, and Eliza finally takes his hand and sings only one line: *it's quiet uptown*.  The music swells, and the Company asks:

  <span class='music' data-char='24' data-clip='1'>
    <span class='control'></span>
    Forgiveness.  Can you imagine? &nbsp;<br />
    &nbsp; Forgiveness.  Can you imagine? &nbsp;<br />
    &nbsp; If you see him in the street, walking by her side, talking by her side, have pity &nbsp;<br />
    &nbsp; They are going through the unimaginable &nbsp;<br />
  </span>

  And it's heartbreakingly beautiful as they reconcile, and their story comes around full circle; Alexander finally puts Eliza first.
      `
    },
    {
      id: 'eliza5',
      consecutive: true,
      random: true,
      highlightedSong: '46',
      style: {
        paddingTop,
        paddingBottom: isMobile ? window.innerHeight / 2 : padding,
        height: isMobile ? 'auto' : 400,
        marginBottom: isMobile ? 100 : marginBottom + 250
      },
      contentStyle: {
        padding: 10,
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : ''
      },
      clips: [['/music/haveidoneenough.mp3', ['7/46:70-74']]],
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        return positionEliza(data, selectedThemes, this.highlightedSong);
      },
      text: `
  ### Will They Tell My Story?

  At the beginning of their marriage, Eliza tells Alexander that if he could just stay by her side, *that would be enough*.  As their marriage progresses and she realizes the extent of his ambition, Eliza starts to doubt herself, asking Alexander *what would be enough* - if she could be enough.  But as they face the hardest of trials - an affair and the death of a child - their relationship reverses, and Alexander asks if he could stay by her side, *that would be enough*.

  As the musical closes with *Who Lives, Who Dies, Who Tells Your Story*, Eliza comes into her own; after Alexander's death, she puts herself back in the narrative.  She tells his story, his fellow soldiers' stories, Washington's story.  She builds the first private orphanage in New York City - her proudest accomplishment.  And when her time is up, she asks:

  <span class='music' data-char='7' data-clip='0'>
    <span class='control'></span>
    Have *I* done enough? &nbsp;<br />
    &nbsp; Will they tell *my* story? &nbsp;<br />
  </span>

  That subtle change in wording is amazing; Eliza is no longer concerned about *what would be enough*, but rather if *she* has *done* enough.  She is responsible for her own purpose, her own legacy.  She is no longer a secondary character in her husband's story, but **the main character of her own**.
      `
    },
    {
      id: 'filter_tool',
      style: {
        paddingTop: (isMobile ? 0.5 : 2) * paddingTop,
        height: isMobile ? 'auto' : 1300
      },
      contentStyle: {
        padding: 10,
        backgroundColor: isMobile ? 'rgba(255, 255, 255, 0.9)' : '',
        textAlign: 'center'
      },
      filter: isMobile ? '' : 'all',
      position(data, selectedCharacters, selectedConversation, selectedThemes) {
        // if we're on mobile just do nothing
        if (isMobile)
          return { linePositions: [], songPositions: [], diamondPositions: [] };

        var {
          linePositions,
          diamondPositions,
          songPositions,
          groupedThemes,
          characterNodes,
          characterLinks
        } = FilterGraph.filterForAll(
          data,
          selectedCharacters,
          selectedConversation,
          selectedThemes
        );

        if (
          selectedCharacters.length ||
          selectedConversation.length ||
          selectedThemes.length
        ) {
          var {
            linePositions,
            songPositions,
            diamondPositions
          } = PositionGraph.positionForAll(
            linePositions,
            diamondPositions,
            songPositions,
            vizWidth,
            sectionWidth,
            2 * paddingTop
          );

          return {
            linePositions,
            songPositions,
            diamondPositions,
            groupedThemes,
            characterNodes,
            characterLinks,
            selectedCharacters,
            selectedConversation,
            selectedThemes
          };
        } else {
          var { linePositions } = PositionGraph.positionLinesBySong(
            data.lines,
            sectionWidth - 75,
            2 * paddingTop
          );
          return {
            linePositions,
            songPositions: [],
            diamondPositions: [],
            groupedThemes,
            characterNodes,
            characterLinks,
            selectedCharacters,
            selectedConversation,
            selectedThemes
          };
        }
      },
      text: `
  ${!isMobile ? `### Explore their stories.` : ''}

  Angelica and Eliza are only two of the stories I've found; **there are many more**. ${
    isMobile
      ? `
  I have built an interactive tool to filter every line in Hamilton by character, conversation, and theme.  Unfortunately, the tool is too computationally intensive for mobile.
  ### Make sure to explore their stories with the filter tool on desktop.
  `
      : `
  Filter by any combination of characters, conversations, and themes below to explore them.  Take advantage of the fact that some characters, conversations, or themes will disappear as you filter down; their co-appearances and co-occurrences are often times just as interesting as the songs that are left.

  <h3>
  <span class='background'>
If you get into a bad state, <span class='underline reset'>reset</span>.
  </span><br />
  <span class='background'>
↓
  </span>
  </h3>
  `
  }
      `
    }
  ];
}

export default sections;
