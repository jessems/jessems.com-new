for file in $(find . -name "index.md"); do
    # Replace ![](.images/<image>.<ext>) with ![](./images/<image>.<ext>)
    sed -i '' -E 's#\!\[([^]]*)\]\(\.images/([^)]*)\)#\!\[\1\]\(./images/\2\)#g' $file
done