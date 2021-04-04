# import pathlib
# import  os
# import sys
# import pandas as pd
# import numpy as np
# import joblib
# my_path = pathlib.Path(__file__).parent.absolute()
# new_path = "model"
# predicted_value = ""
# try:
#     new_dir = os.mkdir(new_path)
#     my_path = os.path.join(my_path, new_dir)
# except:
#     my_path = os.path.join(my_path, new_path)
# try:

#     loaded_model = joblib.load("{}/model_joblib".format(my_path))
#     # array = [5,3,1.0,0.0,35.0,0,0,8.0500,1.0,0.0,0.0]
#     array = []
#     """getting data from user for prediction""" 
#     array = []
#     for i in range(1, 12):
#         array.append(float(sys.argv[i]))

#     #each value represents a feature present in the training set Hint: the users should be able to enter their own values/(or) select from a drop down list of values to make custom predictions
#     a = np.asarray(array).reshape(1,-1)
#     predicted_value= loaded_model.predict(a)[0]

# except:
#     df = pd.read_csv("titanic.csv")
#     df['Age']= df['Age'].fillna(df['Age'].mean())
#     df.isna().sum()
#     df.dropna(subset=['Embarked'],inplace=True)
#     df.isna().sum()
#     cols = df.columns.tolist()
#     num_cols = df.select_dtypes([np.int64,np.float64]).columns.tolist()
#     num_cols.remove('PassengerId')

#     y = pd.Series(df['Survived'])
#     drop_list = ['Survived','Name','Ticket','Cabin']
#     X = df.drop(drop_list,axis=1)

#     import category_encoders as ce
#     encoder=ce.OneHotEncoder(handle_unknown='return_nan',return_df=True,use_cat_names=True)
#     X = encoder.fit_transform(X)


#     from sklearn.model_selection import train_test_split

#     X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,stratify=y,random_state=42)
#     from sklearn.ensemble import RandomForestClassifier
#     from sklearn.metrics import accuracy_score, f1_score, roc_auc_score

#     model = RandomForestClassifier()
#     model.fit(X_train,y_train)
#     import joblib
#     joblib.dump(model,"{}/model_joblib".format(my_path))

#     loaded_model = joblib.load("{}/model_joblib".format(my_path))
#     # array = [5,3,1.0,0.0,35.0,0,0,8.0500,1.0,0.0,0.0]
#     array = []
#     """getting data from user for prediction""" 
#     array = []
#     for i in range(1, 12):
#         array.append(float(sys.argv[i]))

#     #each value represents a feature present in the training set Hint: the users should be able to enter their own values/(or) select from a drop down list of values to make custom predictions
#     a = np.asarray(array).reshape(1,-1)
#     predicted_value= loaded_model.predict(a)[0]

# # print("{\"name\": \"{}\"}".format(predicted_value))
# print("predicted:{}".format(predicted_value))

if __name__ == '__main__':
    print("hi")
