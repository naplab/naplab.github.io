import re
import sys
import os

# ================= Configuration =================
# Input file (Your BibTeX file path)
INPUT_FILE = './pub.bib' 
# Output file (Path to Jekyll data file)
OUTPUT_FILE = './pub.yaml'
# =================================================

def parse_bibtex(file_path):
    """
    Reads a .bib file and parses it into a list of dictionaries.
    Does not depend on third-party libraries; uses Regex for parsing.
    """
    if not os.path.exists(file_path):
        print(f"Error: Input file '{file_path}' not found.")
        return []

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simple BibTeX parsing logic
    # 1. Split entries based on @article, @inproceedings, etc.
    raw_entries = re.split(r'@\w+\s*\{', content)
    
    parsed_entries = []

    for entry in raw_entries:
        if not entry.strip():
            continue

        # Extract fields
        # Match pattern: key = {value} or key = "value"
        def get_field(key):
            # Regex explanation: look for key=, ignore case, non-greedy match inside braces or quotes
            pattern = re.compile(rf'{key}\s*=\s*[\{{"](.*?)(?<!\\)[\}}"]', re.DOTALL | re.IGNORECASE)
            match = pattern.search(entry)
            if match:
                # Remove newlines, extra spaces, and clean BibTeX specific chars
                text = match.group(1)
                text = text.replace('\n', ' ').replace('\r', '')
                text = re.sub(r'\s+', ' ', text) # Merge multiple spaces
                text = text.replace('{', '').replace('}', '') # Remove protective braces
                text = text.replace('\\&', '&') # Handle ampersand
                return text.strip()
            return None

        title = get_field('title')
        year = get_field('year')
        
        # Only treat as a valid entry if both title and year exist
        if title and year:
            parsed_entries.append({
                'title': title,
                'authors': clean_authors(get_field('author')),
                'journal': get_field('journal') or get_field('booktitle') or "Preprint",
                'year': int(year),
                'volume': get_field('volume'),
                'pages': get_field('pages'),
                'link': get_field('url') or get_field('link') or "",
                'img': "",
                'tldr': ""
            })

    # Sort by year descending (newest first)
    parsed_entries.sort(key=lambda x: x['year'], reverse=True)
    return parsed_entries

def clean_authors(author_str):
    """
    Parses BibTeX author format and converts to 'F Lastname' format.
    Example: 'Norman-Haignere, Sam V' -> 'S Norman-Haignere'
    Example: 'Mischler, Gavin' -> 'G Mischler'
    """
    if not author_str:
        return ""
    
    # Normalize spaces
    author_str = re.sub(r'\s+', ' ', author_str.strip())
    
    # Split by ' and ' (case insensitive)
    raw_authors = re.split(r'\s+and\s+', author_str, flags=re.IGNORECASE)
    
    formatted_authors = []
    
    for auth in raw_authors:
        auth = auth.strip()
        if not auth:
            continue
            
        # Check format: "Lastname, Firstname" (BibTeX standard)
        if ',' in auth:
            parts = auth.split(',', 1)
            last_name = parts[0].strip()
            first_part = parts[1].strip()
            
            # Get the first initial of the first name
            # We take the first character of the first word in the first name section
            initial = first_part[0] if first_part else ""
            
            formatted_authors.append(f"{initial} {last_name}")
            
        # Fallback for "Firstname Lastname" (Less common in strict BibTeX but possible)
        else:
            parts = auth.split()
            if len(parts) > 1:
                last_name = parts[-1]
                first_name = parts[0]
                initial = first_name[0]
                formatted_authors.append(f"{initial} {last_name}")
            else:
                # Single name edge case
                formatted_authors.append(auth)
                
    # Join with commas
    return ", ".join(formatted_authors)

def load_existing_titles(output_path):
    """Return a set of existing titles already stored in the YAML file."""
    if not os.path.exists(output_path):
        return set()

    titles = set()
    title_pattern = re.compile(r'^-\s+title:\s*"(.*)"')

    with open(output_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            match = title_pattern.match(line)
            if match:
                title = match.group(1).replace('\\"', '"')
                titles.add(title)

    return titles

def ensure_header(output_path):
    """Ensure the YAML file has the standard auto-generated header."""
    if os.path.exists(output_path) and os.path.getsize(output_path) > 0:
        return

    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("# Auto-generated by bib2yaml.py\n")
        f.write("# DO NOT EDIT THIS FILE DIRECTLY if you use the script.\n\n")

def append_to_yaml(entries, output_path, existing_titles):
    """Append only new entries to the YAML file, skipping duplicates."""
    new_entries = [entry for entry in entries if entry['title'] not in existing_titles]

    if not new_entries:
        print("No new entries to append. YAML already up to date.")
        return

    ensure_header(output_path)

    # Sort new entries by year descending (already sorted, but keep deterministic)
    new_entries.sort(key=lambda x: x['year'], reverse=True)

    with open(output_path, 'a', encoding='utf-8') as f:
        # Ensure we start on a new line if file doesn't already end with one
        f.write("\n" if os.path.getsize(output_path) > 0 else "")

        for entry in new_entries:
            existing_titles.add(entry['title'])
            f.write(f"- title: \"{escape_yaml_string(entry['title'])}\"\n")
            f.write(f"  authors: \"{escape_yaml_string(entry['authors'])}\"\n")
            f.write(f"  journal: \"{escape_yaml_string(entry['journal'])}\"\n")
            f.write(f"  year: {entry['year']}\n")

            if entry['volume']:
                f.write(f"  volume: \"{entry['volume']}\"\n")
            if entry['pages']:
                f.write(f"  pages: \"{entry['pages']}\"\n")

            f.write(f"  link: \"{entry['link']}\"\n")
            f.write(f"  img: \"{escape_yaml_string(entry['img'])}\"\n")
            f.write(f"  tldr: \"{escape_yaml_string(entry['tldr'])}\"\n")

            f.write("\n")

    print(f"Appended {len(new_entries)} new entries to {output_path}")

def escape_yaml_string(text):
    """
    Escapes double quotes in strings to prevent YAML format errors.
    """
    if not text:
        return ""
    # Escape double quotes
    text = text.replace('"', '\\"')
    return text

if __name__ == "__main__":
    print("Running bib2yaml converter...")
    entries = parse_bibtex(INPUT_FILE)
    if entries:
        existing_titles = load_existing_titles(OUTPUT_FILE)
        append_to_yaml(entries, OUTPUT_FILE, existing_titles)
    else:
        print("No entries found or input path is incorrect.")