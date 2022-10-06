import json
from pathlib import Path

def GenerateDir(root):
    """ Generates the directory tree of the current qexp_data directory. The data dashboard relies on this tree to navigate results. 
        """
    results = WalkDir(root)
    with open(root.joinpath('index'),'w') as f:
        json.dump(results,f, indent=2)

def WalkDir(dir: Path):
    """ Utility: Walks current directory (recursive).
        Parameters:
            - dir (Path): current directory. 
        """
    curr={}
    this_level=[str(x.parts[-1]) for x in Path(dir).iterdir()]
    if this_level == []:
        return {}
    else:
        for thing in this_level:
            if dir.joinpath(thing).is_dir():
                curr[thing] = WalkDir(dir.joinpath(thing))
            else:
                curr[thing] = 'file'
    return curr


if __name__=="__main__":
    GenerateDir(Path.cwd().joinpath('blog_pages'))