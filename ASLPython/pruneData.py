import os

# call this function to delete data points to train model faster and prevent overfeed
def pruneData(indexTest, indexTrain, indexVal):
    dirTypes = ['test', 'train', 'valid']
    dirs = ['00','01','02','03','04','05','06','07','08','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',]
    
    for dirType in dirTypes:
        for dir in dirs:
            dirPath = os.path.join(dirType, dir)
            dirList = os.listdir(dirPath)
            index = 0
            if (dirType == 'test'):
                index = indexTest
            elif (dirType == 'train'):
                index = indexTrain
            elif (dirType == 'valid'):
                index = indexVal
            if index > 0:
                for file in dirList[::index]:
                    # print(n)
                    os.unlink(os.path.join(dirPath,file))

pruneData(0, 0, 3)
