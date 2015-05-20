desc 'Build the website from source'
task :build do
  puts '## Building website'
  status = system('middleman build --clean')
  puts status ? 'OK' : 'FAILED'
end

desc 'Run the preview server at http://localhost:4567'
task :preview do
  system('middleman server')
end

desc 'Deploy the website'
task :deploy do
  puts '## Deploying website'
  status = system('middleman deploy')
  puts status ? 'OK' : 'FAILED'
end

desc 'Build docker image'
task :docker do
  puts '## Building docker image'
  commit = `git rev-parse --short HEAD`.strip
  status = system("docker build -t chris/www_cso:#{commit} .")
  puts "Hash #{commit}: #{status ? 'OK' : 'FAILED'}"
  status = system('docker build -t chris/www_cso:latest .')
  puts "Latest: #{status ? 'OK' : 'FAILED'}"
end

desc 'Build and create docker container'
task :package => [:build, :docker] do
end