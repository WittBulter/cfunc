import { spawn, SpawnOptions } from 'child_process'

const $spawn = async(
  command: string,
  args: string[],
  opts: SpawnOptions = { stdio: 'inherit' },
) => new Promise((resolve, reject) => {
  const stderr: Buffer[] = []
  const child = spawn(command, args, opts)
  
  if (opts.stdio === 'pipe') {
    child.stderr.on('data', err => stderr.push(err))
  }
  
  child.on('error', reject)
  child.on('close', (code, signal) => {
    if (code === 0) return resolve()
    
    const errorLogs = stderr.map(line => line.toString())
      .join('')
    if (opts.stdio !== 'inherit') {
      reject(new Error(`Exited with ${code || signal}\n${errorLogs}`))
    } else {
      reject(new Error(`Exited with ${code || signal}`))
    }
  })
})
