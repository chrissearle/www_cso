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

namespace :docker do
  def get_commit
    `git rev-parse --short HEAD`.strip
  end
  
  desc 'Build docker image'
  task :package do
    Dir.chdir('build') do
      puts '## Building docker image'
      status = system("docker build -t docker.home.chrissearle.org:5000/www_cso:#{get_commit()} .")
      puts "Hash #{get_commit()}: #{status ? 'OK' : 'FAILED'}"
      status = system("docker tag -f docker.home.chrissearle.org:5000/www_cso:#{get_commit()} docker.home.chrissearle.org:5000/www_cso:latest")
      puts "Latest: #{status ? 'OK' : 'FAILED'}"
    end
  end

  desc 'Deploy to repo'
  task :deploy do
    Dir.chdir('build') do
      puts '## Deploying docker image'
      status = system("docker push docker.home.chrissearle.org:5000/www_cso:#{get_commit()}")
      puts "Hash #{get_commit()}: #{status ? 'OK' : 'FAILED'}"
      status = system('docker push docker.home.chrissearle.org:5000/www_cso:latest')
      puts "Latest: #{status ? 'OK' : 'FAILED'}"
    end
  end
end

desc 'Build and create docker container'
task :package => [:build, :'docker:package', :'docker:deploy'] do
end