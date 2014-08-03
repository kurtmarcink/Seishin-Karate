#!/bin/sh

files=( "build-package/about.html" "build-package/contact.html" "build-package/history.html" "build-package/index.html" "build-package/locations.html" "build-package/programs.html" "build-package/social.html" "build-package/staff.html" "build-package/tournaments.html" "build-package/medway.html" "build-package/natick.html" "build-package/sherborn.html" "build-package/wellesley.html" "build-package/weston.html" )

if [ ! -d "build-package" ]
then
    echo "create dir: build-package"
    mkdir build-package;
else
    echo "dir exists: build-package"
    echo "delete: contents of build-package"
    rm -r build-package/*
fi

echo "copy development to build-package"
cp -r development/* build-package

for i in "${files[@]}";
do
	backup=$i.bak
	echo "update Modernizr: $i"
	sed -i.bak "/BUILD:MODERNIZR/ r build-package/components/HTML-Snippets/modernizrCheck.html" $i
	echo "delete backup: $backup"
	rm -f $backup

	backup=$i.bak
	echo "update beginScripts: $i"
	sed -i.bak "/BUILD:BEGINSCRIPTS/ r build-package/components/HTML-Snippets/beginScripts.html" $i
	echo "delete backup: $backup"
	rm -f $backup

	backup=$i.bak
	echo "update navbar: $i"
	sed -i.bak "/BUILD:NAVBAR/ r build-package/components/HTML-Snippets/navbar.html" $i
	echo "delete backup: $backup"
	rm -f $backup

	backup=$i.bak
	echo "update footer: $i"
	sed -i.bak "/BUILD:FOOTER/ r build-package/components/HTML-Snippets/footer.html" $i
	echo "delete backup: $backup"
	rm -f $backup

	backup=$i.bak
	echo "update endScripts: $i"
	sed -i.bak "/BUILD:ENDSCRIPTS/ r build-package/components/HTML-Snippets/endScripts.html" $i
	echo "delete backup: $backup"
	rm -f $backup
done

echo "delete components folder"
rm -r build-package/components