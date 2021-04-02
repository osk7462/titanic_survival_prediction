import pathlib
import  os
my_path = pathlib.Path(__file__).parent.absolute()
new_path = "apiData"
file_name = "api.txt"
try:
    new_dir = os.mkdir(new_path)
    my_path = os.path.join(my_path, new_dir)
except:
    my_path = os.path.join(my_path, new_path)

api_data = ""
try:
    file_name = os.path.join( my_path, file_name )
    with open(file_name, "r") as api_file:
        for line in api_file:
            api_data += line
except:
    import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt
    df = pd.read_csv("titanic.csv")
    df['Age']= df['Age'].fillna(df['Age'].mean())
    df.isna().sum()
    df.dropna(subset=['Embarked'],inplace=True)
    
    cols = df.columns.tolist()
    num_cols = df.select_dtypes([np.int64,np.float64]).columns.tolist()
    num_cols.remove('PassengerId')

    i = int(0)
    for col in num_cols:
        df.hist(column=col)
        plt.savefig("{}/fig{}.png".format(my_path, i))
        api_data += "http://localhost:3000/fig{}.png,".format(i,i)        
        i += 1

    from pandas.plotting import scatter_matrix

    scatter_matrix(df[num_cols],figsize=(50,50))
    plt.savefig("{}/fig{}.png".format(my_path, i))
    api_data += "http://localhost:3000/fig{}.png,,".format(i,i)
    i += 1
    obj_cols = df.select_dtypes([np.object]).columns.tolist()
    for col in obj_cols:
        df[col].value_counts().plot(kind='bar')

    y = pd.Series(df['Survived'])
    drop_list = ['Survived','Name','Ticket','Cabin']
    X = df.drop(drop_list,axis=1)

    import category_encoders as ce
    encoder=ce.OneHotEncoder(handle_unknown='return_nan',return_df=True,use_cat_names=True)
    X = encoder.fit_transform(X)


    from sklearn.model_selection import train_test_split

    X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,stratify=y,random_state=42)
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import accuracy_score, f1_score, roc_auc_score

    model = RandomForestClassifier()
    model.fit(X_train,y_train)

    import joblib
    joblib.dump(model,"{}/model_joblib".format(my_path))


    train_preds = model.predict(X_train)
    training_score = "accuracyScore:{},F1Score:{},ROCAUCScore:{},".format(accuracy_score(train_preds,y_train),f1_score(train_preds,y_train), roc_auc_score(train_preds,y_train) )

    test_preds = model.predict(X_test)
    testing_score = "accuracyScore:{},F1Score:{},ROCAUCScore:{},".format(accuracy_score(test_preds,y_test),f1_score(test_preds,y_test), roc_auc_score(test_preds,y_test) )
    api_data += ",trainingScore,,{},,testScore,,{}".format(training_score, testing_score)
    with open(file_name, "w") as api_file:
        api_file.write(api_data)
print(api_data)




