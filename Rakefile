namespace :book do
  desc 'prepare build'
  task :prebuild do
    Dir.mkdir 'images' unless Dir.exists? 'images'
    Dir.glob("source/*/images/*").each do |image|
      FileUtils.copy(image, "images/" + File.basename(image))
    end
    FileUtils.cp_r('avatars', 'images/')
  end

  desc 'build HTML version'

  file 'theme/html/book.css' =>
    ['asciidoctor-stylesheet-factory/sass/settings/_book.scss',
     'asciidoctor-stylesheet-factory/sass/book.scss'] do
    puts "Compiling book.scss"
    file `cd asciidoctor-stylesheet-factory && ./build-stylesheet.sh book && cp stylesheets/book.css ../theme/html/`
    puts " -- stylesheet copied to theme/html/book.css"
  end

  task :stylesheet => ['theme/html/book.css']

  task :html => [:prebuild,:stylesheet] do
    puts "Converting to HTML..."
    `bundle exec asciidoctor -r asciidoctor-diagram -a stylesheet=theme/html/book.css -a html book.adoc`
    puts " -- HTML output at book.html"
  end

  desc 'build epub version'
  task :epub => :prebuild do
    puts "Converting to EPub..."
    `bundle exec asciidoctor-epub3 -r asciidoctor-diagram book.adoc`
    puts " -- Epub output at book.epub"
  end

  desc 'build mobi version'
  task :mobi => :prebuild do
    puts "Converting to Mobi (kf8)..."
    `bundle exec asciidoctor-epub3 -r asciidoctor-diagram -a ebook-format=kf8 book.adoc`
    puts " -- Mobi output at book.mobi"
  end

  desc 'build pdf version'
  task :pdf => :prebuild do
    puts "Converting to PDF... (this one takes a while)"
    `bundle exec asciidoctor-pdf -r asciidoctor-diagram -a pdf-stylesdir=theme/pdf -a pdf-style=book -a pdf-fontsdir=theme/fonts book.adoc`
    puts " -- PDF  output at book.pdf"
  end

  desc 'build all versions'
  task :build => [:html, :epub, :mobi, :pdf]
end

task :default => "book:build"
task :watch do
    sh 'bundle exec guard -o 10.0.2.2:4000'
end

task :listen do
    sh 'listen -r -f 0.0.0.0:4000 -d source'
end

task :serve do
    sh 'gulp serve'
end
