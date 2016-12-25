#!/usr/bin/python

import xml.etree.ElementTree as ET
import sys

ns = {'ns': 'http://www.topografix.com/GPX/1/1'}

if __name__ == '__main__':
    tree = ET.parse(sys.argv[1])
    root = tree.getroot()

    trk = root.find('ns:trk', ns)
    trksegs = trk.findall('ns:trkseg', ns)

    result = []
    for seg in trksegs:
        trkpts = seg.findall('ns:trkpt', ns)
        for trkpt in trkpts:
            result.append('[' + trkpt.get('lat') + ', ' + trkpt.get('lon') + ']')

    print '{'
    print '  path: [' + ', '.join(result) + '],'
    print "  title: '',"
    print "  distance: '',"
    print "  date: '',"
    print "  participants: ["
    print "  ]"
    print "},"
