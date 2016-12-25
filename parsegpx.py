#!/usr/bin/python

import xml.etree.ElementTree as ET
import sys
import re
import datetime

ns = {'ns': 'http://www.topografix.com/GPX/1/1'}

if __name__ == '__main__':
    gpx_file = sys.argv[1]
    title = sys.argv[2]
    distance = sys.argv[3]
    name_string = sys.argv[4]
    names = re.findall(r'\b[A-Z][a-zA-Z]+', name_string)
    names.append('Lisa')
    names = ["'" + name + "'" for name in sorted(names)]

    tree = ET.parse(gpx_file)
    root = tree.getroot()

    trk = root.find('ns:trk', ns)
    trksegs = trk.findall('ns:trkseg', ns)

    date_string = trksegs[0].find('ns:trkpt', ns).find('ns:time', ns).text
    date = datetime.datetime.strptime(date_string, "%Y-%m-%dT%H:%M:%SZ")

    result = []
    for seg in trksegs:
        trkpts = seg.findall('ns:trkpt', ns)
        for trkpt in trkpts:
            result.append('[' + trkpt.get('lat') + ', ' + trkpt.get('lon') + ']')

    print '{'
    print '  path: [' + ', '.join(result) + '],'
    print "  title: '" + title + "',"
    print "  distance: " + distance + ","
    print "  date: '" + date.strftime('%d %b %Y') + "',"
    print "  participants: ["
    print "    " + ',\n    '.join(names)
    print "  ]"
    print "},"
