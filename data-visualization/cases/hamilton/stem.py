import csv
import json
import re

from nltk.stem.lancaster import LancasterStemmer
stemmer = LancasterStemmer()

for i in range(46):
    i += 1
    print (i)
    # get file and loop through each line
    lines = open('data/songs/' + str(i) + '.txt', 'r')
    data = []
    for line in lines:
        line = line.replace('\n', '')
        stemmedLine = []
        # for each line, loop through all words and pass it through stemmer
        for word in re.sub('[^a-zA-Z]+', ' ', line).split():
            stemmed = stemmer.stem(word)
            stemmedLine.append(stemmed)
        # then push it back into lines
        stemmedLine = " ".join(stemmedLine)
        data.append([line, stemmedLine])

    # after everything is done, write it to file
    with open('processed/' + str(i) + '.json', 'w') as outfile:
        json.dump(data, outfile)
