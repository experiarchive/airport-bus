const fs = require('fs');
const path = require('path');

const csvDir = path.join(__dirname, '../data/csv');
const outputFile = path.join(__dirname, '../data/timetable.ts');

// Helper to parse CSV line
function parseCSVLine(line) {
    const values = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
            values.push(currentValue.trim());
            currentValue = '';
        } else {
            currentValue += char;
        }
    }
    values.push(currentValue.trim());
    return values;
}

function convertCsvToTs() {
    if (!fs.existsSync(csvDir)) {
        console.error('CSV directory not found:', csvDir);
        return;
    }

    const files = fs.readdirSync(csvDir).filter(file => file.endsWith('.csv'));
    const timetableData = {};

    files.forEach(file => {
        // Parse filename: {busNo}_{direction}.csv
        // Example: 6001_Dongdaemun.csv
        const fileNameMatch = file.match(/^(.+)_(.+)\.csv$/);
        if (!fileNameMatch) {
            console.warn(`Skipping file with invalid name format: ${file}. Expected format: {busNo}_{direction}.csv`);
            return;
        }

        const busNo = fileNameMatch[1];
        const direction = fileNameMatch[2].replace(/_/g, ' '); // Replace underscores with spaces for display

        const content = fs.readFileSync(path.join(csvDir, file), 'utf-8');
        const lines = content.split('\n').filter(line => line.trim() !== '');

        if (lines.length < 2) return;

        // Header contains station names
        const stationNames = parseCSVLine(lines[0]);

        // Check 2nd row for custom URLs
        let customUrls = [];
        let startRow = 1;

        if (lines.length > 1) {
            const secondRow = parseCSVLine(lines[1]);
            // If the first item looks like a URL, assume this row contains URLs
            if (secondRow[0] && (secondRow[0].startsWith('http') || secondRow[0].startsWith('www'))) {
                customUrls = secondRow;
                startRow = 2; // Start parsing times from 3rd row
            }
        }

        if (!timetableData[busNo]) {
            timetableData[busNo] = {};
        }
        if (!timetableData[busNo][direction]) {
            timetableData[busNo][direction] = [];
        }

        // Initialize stations
        const stations = stationNames.map((name, index) => ({
            stationName: name,
            // Use custom URL if available, otherwise auto-generate
            locationUrl: customUrls[index]
                ? customUrls[index]
                : `https://maps.google.com/?q=${encodeURIComponent(name)}`,
            times: []
        }));

        // Parse times
        for (let i = startRow; i < lines.length; i++) {
            const times = parseCSVLine(lines[i]);
            times.forEach((time, index) => {
                if (time && stations[index]) {
                    // Normalize time to HH:MM format (e.g., "4:30" -> "04:30")
                    const [hours, minutes] = time.split(':');
                    if (hours && minutes) {
                        const normalizedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
                        stations[index].times.push(normalizedTime);
                    }
                }
            });
        }

        // Sort times for each station
        stations.forEach(station => {
            station.times.sort();
        });

        timetableData[busNo][direction] = stations;
    });

    const tsContent = `export interface StationTimetable {
  stationName: string;
  locationUrl: string;
  times: string[];
}

export interface RouteTimetable {
  [direction: string]: StationTimetable[];
}

export interface TimetableData {
  [busNo: string]: RouteTimetable;
}

export const timetable: TimetableData = ${JSON.stringify(timetableData, null, 2)};
`;

    fs.writeFileSync(outputFile, tsContent);
    console.log(`Successfully generated ${outputFile}`);
}

convertCsvToTs();
